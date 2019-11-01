import firebase from 'firebase/app';
import 'firebase/auth';
import store from '@/store/index.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDKRPGAZrRZtI-r7fCzy1jb791yPZd799A',
  authDomain: 'chatapp-f1e5d.firebaseapp.com',
  databaseURL: 'https://chatapp-f1e5d.firebaseio.com',
  projectId: 'chatapp-f1e5d',
  storageBucket: 'chatapp-f1e5d.appspot.com',
  messagingSenderId: '1076128056671',
  appId: '1:1076128056671:web:415c83c7fe1c0d26'
};

export default {
  //認証
  initAuth() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  },
  logIn() {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then();
  },
  logOut() {
    firebase
      .auth()
      .signOut()
      .then()
      .catch(err => alert(err));
  },
  onAuth() {
    firebase.auth().onAuthStateChanged(user => {
      user = user ? user : {};
      store.commit('onAuthStateChanged', user);
      store.commit('onUserStatusChanged', user.uid ? true : false);
    });
  },
  UpdateInfo() {
    let user = firebase.auth().currentUser;
    let userName = null;
    let userIcon = null;

    if (user != null) {
      user.providerData.forEach(function(profile) {
        userName = profile.displayName;
        userIcon = profile.photoURL;
      });

      user
        .updateProfile({
          displayName: userName,
          photoURL: userIcon
        })
        .catch(function(error) {
          console.log(error);
        });

      this.logIn();
    }
  }
};
