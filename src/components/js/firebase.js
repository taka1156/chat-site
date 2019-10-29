import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
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
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
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
      store.Auth.commit('onAuthStateChanged', user);
      store.Auth.commit('onUserStatusChanged', user.uid ? true : false);
    });
  },
  //データベース(ChatRoom)
  initDB(isUser) {
    const chatRoom = firebase.database().ref('ChatRoom');
    if (isUser) {
      chatRoom.limitToLast(30).on('child_added', this.addList);
    } else {
      chatRoom.limitToLast(30).off('child_added', this.addList);
    }
  },
  addList(snap) {
    const ChatInfo = snap.val();
    store.ChatRoom.commit('addList', {
      key: snap.key,
      roomname: ChatInfo.roomname,
      user: ChatInfo.user,
      detail: ChatInfo.detail,
      roompass: ChatInfo.roompass
    });
  },
  doMake(roomInfo) {
    const chatRoom = firebase.database();
    const id = chatRoom.ref('ChatRoom').push().key;

    chatRoom.ref('ChatRoom/' + id).set({
      roomname: roomInfo.roomname,
      user: roomInfo.user,
      detail: roomInfo.detail,
      roompass: roomInfo.roompass
    });

    chatRoom.ref('Chat/' + id).set({
      messagelist: {
        0: {
          name: '管理者',
          image: '',
          message: roomInfo.roomname + 'にようこそ'
        }
      }
    });
  }
  //データベース(message)
};
