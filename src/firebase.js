import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA38D9a2OZh5kYj2N_VWbXthD-InesYNGs",
  authDomain: "vartalaap22.firebaseapp.com",
  projectId: "vartalaap22",
  storageBucket: "vartalaap22.appspot.com",
  messagingSenderId: "63630065743",
  appId: "1:63630065743:web:b273b77652f69abb762a3a"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()