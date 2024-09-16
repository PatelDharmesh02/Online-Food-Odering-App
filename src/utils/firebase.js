// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDow3-02Fknt5kThMNxSCNNdUparT39Q6g",
  authDomain: "platter-food-delivery-app.firebaseapp.com",
  projectId: "platter-food-delivery-app",
  storageBucket: "platter-food-delivery-app.appspot.com",
  messagingSenderId: "1033840907428",
  appId: "1:1033840907428:web:3cffd6912e9da3b1bb4231",
  measurementId: "G-DZBK0XDNFG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
