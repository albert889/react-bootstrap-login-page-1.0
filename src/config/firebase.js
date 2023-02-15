// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5NeaOO61IE64QeiyJwcQXSXQNZKMWUQg",
  authDomain: "toko123-7e672.firebaseapp.com",
  projectId: "toko123-7e672",
  storageBucket: "toko123-7e672.appspot.com",
  messagingSenderId: "452006340328",
  appId: "1:452006340328:web:162acb16d5773f52ee8b5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;