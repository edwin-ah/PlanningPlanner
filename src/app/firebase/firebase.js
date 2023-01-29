// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE34D5aURSgYDIv7N9rsNmAaJXQhDmj0U",
  authDomain: "planningplanner-35963.firebaseapp.com",
  projectId: "planningplanner-35963",
  storageBucket: "planningplanner-35963.appspot.com",
  messagingSenderId: "647257249135",
  appId: "1:647257249135:web:0890813dcadac8aacc449a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore();
export const auth = getAuth();