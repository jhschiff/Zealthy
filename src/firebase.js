// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0c6U8hHG_ilBS_Mdrehy99VREbMLC3BM",
  authDomain: "zealthy-39d37.firebaseapp.com",
  databaseURL: "https://zealthy-39d37-default-rtdb.firebaseio.com/",
  projectId: "zealthy-39d37",
  storageBucket: "zealthy-39d37.firebasestorage.app",
  messagingSenderId: "1052337923599",
  appId: "1:1052337923599:web:e09c3e477752e552c3e57a",
  measurementId: "G-8Q3NRMM8V4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

const analytics = getAnalytics(app);

export default database;