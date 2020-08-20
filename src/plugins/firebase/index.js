import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';
import auth from '@/components/FireBase/auth.js';

Vue.use(firestorePlugin);

auth.initAuth();
auth.onAuth();

export const db = firebase.firestore();
