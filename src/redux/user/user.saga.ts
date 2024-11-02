import { takeLatest, call, all, select, put } from 'typed-redux-saga/macro';
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, User } from 'firebase/auth';
import { AdditionalInfo, TokenType } from '../../data/types/types.global';
import { 
  EmailAndPasswordSignInStart, 
  SignUpStart, signInFailure, 
  signInSuccess, signOutFailure, 
  signOutSuccess, signUpFailure, 
  signUpSuccess, updateAccessTokenFailure, 
  updateAccessTokenSuccess 
} from './user.actions';
import { 
  getCurrentUser, createUserDocFromAuth, 
  signInWithGooglePopup, 
  signInWithFacebookPopup, 
  signOutUser, signInWithTwitterPopUp, 
  getNewAccessTokenFromFirebase 
} from '../../firebase/firebase.utils';
import { selectCurrentUser } from './user.selectors';
import { UserTypes } from './user.types';
import { authenticateUser } from '../../requests/auth.request';


// Saga to handle sign in with Email and Password
export function* signInWIthEmailAndPasswordSaga({payload: {email, password} }: EmailAndPasswordSignInStart) {
  try {
    const tokens: TokenType = yield authenticateUser(`/auth/login`, {email, password});
    yield* put(signInSuccess({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    }));
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

// Saga to handle sign in with Google
export function* signInWithGoogleSaga() {
  try {
    const userCredential = yield* call(signInWithGooglePopup);
    const { user } = userCredential;
    const credential = GoogleAuthProvider.credentialFromResult(userCredential);
    yield* call(getSnapshotFromUserAuth, user, credential?.accessToken);
  } catch (error) {
    console.log("google authentication error: ", error);
    yield* put(signInFailure(error as Error));
  }
}

// Saga to handle sign in with Facebook
export function* signInWithFacebookSaga() {
  try {
    const userCredential = yield* call(signInWithFacebookPopup);
    const { user } = userCredential;
    const credential = FacebookAuthProvider.credentialFromResult(userCredential);
    yield* call(getSnapshotFromUserAuth, user, credential?.accessToken);
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

// Saga to handle sign in with Twitter
export function* signInWithTwitterSaga() {
  try {
    const userCredential = yield* call(signInWithTwitterPopUp);
    const { user } = userCredential;
    const credential = TwitterAuthProvider.credentialFromResult(userCredential);
    yield* call(getSnapshotFromUserAuth, user, credential?.accessToken);
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

// Saga to check if user is authenticated
export function* isUserAuthenticatedSaga() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;

    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

// Saga to create an account for a new user
export function* signUpSaga({ payload: { email, password, displayName } }: SignUpStart) {
  try {
    const tokens: TokenType = yield authenticateUser(`/auth/register`, {displayName, email, password});
    yield* put(signUpSuccess({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    }));
  } catch (error) {
    yield* put(signUpFailure(error as Error));
  }
}

// Saga to handle sign out
export function* signOutSaga() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailure(error as Error));
  }
}

// Function to get snapshot from user authentication
export function* getSnapshotFromUserAuth(user: User, accessToken?: string | undefined, additionalDetails?: AdditionalInfo) {
  try {
    // Optionally use the accessToken in your logic
    const userSnapshot = yield* call(
      createUserDocFromAuth,
      user,
      additionalDetails
    );

    if (userSnapshot) {
      yield* put(signInSuccess({
        id: userSnapshot.id, 
        accessToken: accessToken,
        refreshToken: user.refreshToken
      }));
    }
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

// // Function that updates the access token
export function* updateAccessTokenSaga() {
  try {
    const currentUser = yield* select(selectCurrentUser);
    if (currentUser && currentUser.accessToken) return;
    else {
      const newAccessToken = yield* call(getNewAccessTokenFromFirebase);
      yield* put(updateAccessTokenSuccess(newAccessToken));
    }  
  } catch (error) { yield* put(updateAccessTokenFailure(error as Error)); }
}

// Watcher sagas
export function* onEmailAndPasswordSignInStart() {
  yield* takeLatest(UserTypes.EMAIL_AND_PASSWORD_SIGN_IN_START, signInWIthEmailAndPasswordSaga);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(UserTypes.GOOGLE_SIGN_IN_START, signInWithGoogleSaga);
}

export function* onFacebookSignInStart() {
  yield* takeLatest(UserTypes.FACEBOOK_SIGN_IN_START, signInWithFacebookSaga);
}

export function* onTwitterSignInStart() {
  yield* takeLatest(UserTypes.TWITTER_SIGN_IN_START, signInWithTwitterSaga);
}

export function* onSignUpStart() {
  yield* takeLatest(UserTypes.SIGN_UP_START, signUpSaga);
}

export function* onCheckUserSession() {
  yield* takeLatest(UserTypes.CHECK_USER_SESSION, isUserAuthenticatedSaga);
}

export function* onSignOutStart() {
  yield* takeLatest(UserTypes.SIGN_OUT_START, signOutSaga);
}

export function* onUpdateAccessTokenStart() {
  yield* takeLatest(UserTypes.UPDATE_ACCESS_TOKEN_START, updateAccessTokenSaga)
}

// Root saga to combine all sagas
export function* usersSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onEmailAndPasswordSignInStart),
    call(onGoogleSignInStart),
    call(onFacebookSignInStart),
    call(onTwitterSignInStart),
    call(onSignUpStart),
    call(onSignOutStart),
    call(onUpdateAccessTokenStart)
  ]);
}
