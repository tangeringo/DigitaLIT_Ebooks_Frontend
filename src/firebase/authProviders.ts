import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from "@firebase/auth";

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider = new TwitterAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });