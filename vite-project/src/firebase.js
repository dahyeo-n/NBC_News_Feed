// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBQns53YYkHIGCflwZhbz7wvTqXKED-BQw',
  authDomain: 'newsfeed-96796.firebaseapp.com',
  projectId: 'newsfeed-96796',
  storageBucket: 'newsfeed-96796.appspot.com',
  messagingSenderId: '446375754058',
  appId: '1:446375754058:web:cb4cfba152b4a4a93269b3',
  measurementId: 'G-038ZJSBZ3Z'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
