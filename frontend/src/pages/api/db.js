// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClRluMmSbmQnr8Is6EYFHOGs2LZGGrUPE",
  authDomain: "health-tips-b93db.firebaseapp.com",
  projectId: "health-tips-b93db",
  storageBucket: "health-tips-b93db.appspot.com",
  messagingSenderId: "501271973457",
  appId: "1:501271973457:web:246b621780f0751a8f7270",
  measurementId: "G-Y9Y6MCT4PJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db