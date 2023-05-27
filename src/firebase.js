// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1ARA5B3MHOPp6zUcO1IPfXmx8njfweJg",
  authDomain: "movie-booking-app-2e429.firebaseapp.com",
  projectId: "movie-booking-app-2e429",
  storageBucket: "movie-booking-app-2e429.appspot.com",
  messagingSenderId: "635578804465",
  appId: "1:635578804465:web:40a2c394e34ed349532150",
  measurementId: "G-V0BBZH7D4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function signInWithGoogle(){
  try{
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  }catch(error) {
    console.log(error);
  };
} 

export async function signOutUser(){
  try{
    const result = await signOut(auth)
    return true;
  }catch(error)  {
    return false;
    console.log("error while signing out")
  };
}

export async function handleAuth(cb){
  onAuthStateChanged(auth, (user) => cb(user));
}