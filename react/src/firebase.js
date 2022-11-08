import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApLubRNVPtkgnfZbBl5CO-AlSj3isg4dk",
  authDomain: "nodejs-b1311.firebaseapp.com",
  projectId: "nodejs-b1311",
  storageBucket: "nodejs-b1311.appspot.com",
  messagingSenderId: "253751706046",
  appId: "1:253751706046:web:467a39598ab7015edfb9ef",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
