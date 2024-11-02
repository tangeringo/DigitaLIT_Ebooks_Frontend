import { initializeApp } from "firebase/app";
import { User, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { QueryDocumentSnapshot, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { AdditionalInfo, UserData } from "../data/types/types.global";
import { facebookProvider, googleProvider, twitterProvider } from "./authProviders";


const firebaseConfig = {
  apiKey: "AIzaSyDhb-lhpnwTicXyWq1Wh99xTU0kpuO7Iy8",
  authDomain: "digitalit-425522.firebaseapp.com",
  projectId: "digitalit-425522",
  storageBucket: "digitalit-425522.appspot.com",
  messagingSenderId: "560124367652",
  appId: "1:560124367652:web:c04b60459455f83cf059b1",
  measurementId: "G-2R7P1EFS0X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithFacebookPopup = () => signInWithPopup(auth, facebookProvider);
export const signInWithTwitterPopUp = () => signInWithPopup(auth, twitterProvider);
export const signOutUser = async () =>  await signOut(auth);

export const createUserDocFromAuth = async (
  userAuth: User, 
  additionalInfo = {} as AdditionalInfo
): Promise<void | QueryDocumentSnapshot<UserData>> => {

  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email, uid } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        providerUserId: uid,
        createdAt,
        ...additionalInfo
      });
    } catch(error) { throw new Error('Error creating the user') }
  } return userSnapShot as QueryDocumentSnapshot<UserData>;
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth, (userAuth) => {
        unsubscribe();
        resolve(userAuth)
      }, reject
    )
  })
};


export const getNewAccessTokenFromFirebase = async (): Promise<string > => {
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async(user) => {
      if (user) {
        try {
          const accessToken = await user.getIdToken(true); // Force refresh the token
          resolve(accessToken);
        } catch (error) { reject(error) }
      } else { reject(new Error('No user is signed in')) }
    });
  });
};
