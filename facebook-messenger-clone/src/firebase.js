import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyBKQ_EDBAZLGh0qJa8k7qrlFylNBX-Kokc",
  authDomain: "facebook-messenger-clone-c74c9.firebaseapp.com",
  projectId: "facebook-messenger-clone-c74c9",
  storageBucket: "facebook-messenger-clone-c74c9.appspot.com",
  messagingSenderId: "888741939337",
  appId: "1:888741939337:web:54f833052ad0a320acde58",
  measurementId: "G-3PM4FD37ML",
});

const db = firebaseApp.firestore();

export default db;
