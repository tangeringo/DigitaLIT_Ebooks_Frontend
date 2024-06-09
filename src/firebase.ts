import { initializeApp } from "firebase/app";
import { getAuth, Auth, FacebookAuthProvider, AuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbqC7P_DGCQ-jaQNo5puy8aKTU2sIGrl4",
  authDomain: "alluxe-1679b.firebaseapp.com",
  projectId: "alluxe-1679b",
  storageBucket: "alluxe-1679b.appspot.com",
  messagingSenderId: "710853593868",
  appId: "1:710853593868:web:c88dc42954e80e89e85729",
  measurementId: "G-SB5J0105ST"
};

interface User {
    // id: string;
    // displayName: string
}

//Function to login user 
export const login = async (auth: Auth, provider: AuthProvider): Promise<User | null> => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (e: any) {
        if (e.code === 'auth/popup-closed-by-user') {
            console.error('The popup was closed by the user before completing the sign-in.');
        }
      console.log(`login error ${e}`);
      return null;
    }
};

//Function to logout user
export const logout = async (auth: Auth): Promise<void> => {
    try {
      await signOut(auth); 
    } catch (e) {
      console.log(e);
    }
};


initializeApp(firebaseConfig);
export const auth = getAuth();
export const facebook = new FacebookAuthProvider();