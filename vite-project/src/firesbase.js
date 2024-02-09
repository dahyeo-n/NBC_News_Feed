// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBQ_iDyrFLv3t5ZvjEF2o3rWN_6hZ1zQVo',
  authDomain: 'nbc-logindata.firebaseapp.com',
  projectId: 'nbc-logindata',
  storageBucket: 'nbc-logindata.appspot.com',
  messagingSenderId: '279576748767',
  appId: '1:279576748767:web:dab0f34ad9cd55b1fdff6a',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
