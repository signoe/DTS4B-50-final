// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "movieda-app.firebaseapp.com",
  projectId: "movieda-app",
  storageBucket: "movieda-app.appspot.com",
  messagingSenderId: "677134812199",
  appId: "1:677134812199:web:7cf8c54e979f22ec5efa02"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };