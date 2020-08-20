import { auth } from './index.js';
import store from '@/store/index.js';

//ログインの設定
const initAuth = () => {
  auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
};

//ログインはFirebaseUI経由なので(src\components\pages\Account\parts\LogoutForm.vue)で処理
const logOut = () => {
  auth
    .signOut()
    .then()
    .catch(err => alert(err));
};

//ログイン状態の制御
const onAuth = () => {
  auth.onAuthStateChanged(user => {
    store.commit('auth/setUser', user ? user : null);
  });
};

export default {
  initAuth,
  logOut,
  onAuth
};
