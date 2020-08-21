import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const TIME_STAMP = firebase.firestore.FieldValue.serverTimestamp();
const { Timestamp } = firebase.firestore;

Vue.use(firestorePlugin);

const firebaseInit = firebase.initializeApp({
  apiKey: 'AIzaSyDKRPGAZrRZtI-r7fCzy1jb791yPZd799A',
  authDomain: 'chatapp-f1e5d.firebaseapp.com',
  databaseURL: 'https://chatapp-f1e5d.firebaseio.com',
  projectId: 'chatapp-f1e5d',
  storageBucket: 'chatapp-f1e5d.appspot.com',
  messagingSenderId: '1076128056671',
  appId: '1:1076128056671:web:415c83c7fe1c0d26'
});

const DB = firebaseInit.firestore();
const auth = firebaseInit.auth();

export {
  DB,
  Timestamp,
  TIME_STAMP,
  auth
}
