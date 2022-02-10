import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfmc3JoDkiJAvRi4OfYjHK4Ys2SzI5Q-w",
  authDomain: "react-chat-app-5d7ad.firebaseapp.com",
  projectId: "react-chat-app-5d7ad",
  storageBucket: "react-chat-app-5d7ad.appspot.com",
  messagingSenderId: "583883692262",
  appId: "1:583883692262:web:409b29b4f905dfdb660327",
  measurementId: "G-99J79S2PS7"
};
let firebaseApp;
try {
  firebaseApp = getApp();
} catch (e) {
  firebaseApp = initializeApp(firebaseConfig);
}
// Initialize Firebase
export { firebaseApp };
const db = getFirestore(firebaseApp, {});
export { db };
