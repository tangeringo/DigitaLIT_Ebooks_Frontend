import { takeLatest, call, all, select, put } from 'typed-redux-saga/macro';
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, User } from 'firebase/auth';
import { AdditionalInfo, TokenType } from '../../data/types/types.global';

import { EmailAndPasswordSignInStart, SignUpStart, signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from './user.actions';
import { getCurrentUser, createUserDocFromAuth, signInWithGooglePopup, signInWithFacebookPopup, signOutUser, signInWithTwitterPopUp, updatedTokenPayload } from '../../firebase/firebase.utils';
import { selectCurrentUser } from './user.selectors';
import { UserTypes } from './user.types';
import { loginIntent } from '../../requests/loginIntent';


// Saga to handle sign in with Email and Password
export function* signInWIthEmailAndPasswordSaga({payload: {email, password} }: EmailAndPasswordSignInStart) {
  try {
    const tokens: TokenType = yield loginIntent(`/auth/login`, {email, password});
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
export function* signUp({ payload: { email, password, displayName } }: SignUpStart) {
  try {
    const tokens: TokenType = yield loginIntent(`/auth/register`, {displayName, email, password});
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

// Function that refreshes the access token
export function* refreshTokenSaga() {
  try {
    const tokens = yield* select(selectCurrentUser);
    if (tokens && tokens.accessToken) return;
    else {
      const payload = yield* call(updatedTokenPayload);

      console.log(`persisted ID: ${JSON.stringify(payload.id)}`);
      console.log(`New Access Token: ${JSON.stringify(payload.accessToken)}`);
      console.log(`Refresh Token: ${tokens?.refreshToken}`);

      yield* put(signInSuccess({ 
        id: payload.id, 
        accessToken: payload.accessToken, 
        refreshToken: tokens?.refreshToken 
      }));
    }  
  } catch (error) {
    console.error('Error refreshing token:', error);
    yield* put(signInFailure(error as Error)); // Handle error by dispatching failure action
  }
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
  yield* takeLatest(UserTypes.SIGN_UP_START, signUp);
}

export function* onCheckUserSession() {
  yield* takeLatest(UserTypes.CHECK_USER_SESSION, isUserAuthenticatedSaga);
}

export function* onSignOutStart() {
  yield* takeLatest(UserTypes.SIGN_OUT_START, signOutSaga);
}

export function* onRefreshTokens() {
  yield* takeLatest(UserTypes.REFRESH_TOKEN, refreshTokenSaga)
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
    call(onRefreshTokens)
  ]);
}
