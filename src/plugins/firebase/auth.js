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

// ユーザー情報更新
const updateUserInfo = () => {
  const user = auth.currentUser;
  let name, photoUrl;
  name = photoUrl = '';

  if (user != null) {
    user.providerData.forEach(function(profile) {
      name = profile.displayName;
      photoUrl = profile.photoURL;
    });
  }

  user
    .updateProfile({
      displayName: name,
      photoURL: photoUrl
    })
    .then(function() {
      alert('ユーザー情報の更新に成功しました。');
      location.reload();
    })
    .catch(function(error) {
      alert('ユーザー情報の更新に失敗しました');
    });
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
  updateUserInfo,
  onAuth
};
