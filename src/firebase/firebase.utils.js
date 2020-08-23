// import * as firebase from 'firebase/app';
// import 'firebase/storage';
// import 'firebase/firestore';

import firebase from '../../firebase/functions/node_modules/firebase';
import '../../firebase/functions/node_modules/firebase/firestore';
import '../../firebase/functions/node_modules/firebase/auth';
import '../../firebase/functions/node_modules/firebase/functions';
// import * as admin from '../../firebase/functions/node_modules/firebase-admin';

var firebaseConfig = {
  apiKey: 'AIzaSyA5O1Mu8to1qOPLhAyNGqzPVypIVLxZXvM',
  authDomain: 'testproject-257115.firebaseapp.com',
  databaseURL: 'https://testproject-257115.firebaseio.com',
  projectId: 'testproject-257115',
  storageBucket: 'testproject-257115.appspot.com',
  messagingSenderId: '784435269874',
  appId: '1:784435269874:web:4b02be00dc4128c285c06b',
};

// firebase().f;

//to make it work you need gmail account
// export const gmailEmail = firebase.functions();
// export const gmailPassword = firebase.functions().config().gmail.pass;

// console.log(gmailEmail, gmailPassword);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// const projectStorage = firebase.storage();
// const projectFirestore = firebase.firestore();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// export { projectStorage, projectFirestore, timestamp };

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();
// export const admin = firebase.admin();

export default firebase;
