// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBmzTjNG-MQY6h4JUtEcw1Qu5LSUzFEkO4',
  authDomain: 'smart-shopping-list-e191b.firebaseapp.com',
  projectId: 'smart-shopping-list-e191b',
  storageBucket: 'smart-shopping-list-e191b.appspot.com',
  messagingSenderId: '556220177707',
  appId: '1:556220177707:web:567bd18f5a8cdf3e22396e',
  measurementId: 'G-5JZX17K65N',
};

let fb = firebase.initializeApp(firebaseConfig);

export { fb };
