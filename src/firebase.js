import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjDw_NCC19MguK_dfBG9tDdmE82S9aXkI",
  authDomain: "blog-app-8353d.firebaseapp.com",
  projectId: "blog-app-8353d",
  storageBucket: "blog-app-8353d.appspot.com",
  messagingSenderId: "843573253968",
  appId: "1:843573253968:web:d267fdb519e25368b7be55"
};  

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app);
export const storage=getStorage(app);