<template>
  <div class="LoginForm">
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Now Loading...</div>
  </div>
</template>

<script>
let firebase = require('firebase/app');
let firebaseui = require('firebaseui-ja');
require('firebaseui-ja/dist/firebaseui.css');

export default {
  name: 'LoginForm',
  mounted() {
    //FirebaseUIログインの設定
    const uiConfig = {
      callbacks: {
        //アカウント情報が取得できた時の処理
        signInSuccessWithAuthResult: function(currentUser) {
          //vuexにユーザー情報、状態を渡す
          store.commit('onAuthStateChanged', currentUser);
          store.commit('onUserStatusChanged', true);
          return true;
        },
        //ログインボタンが表示されるまでid=loader要素を表示
        uiShown: () => {
          document.getElementById('loader').style.display = 'none';
        }
      },
      //ログインプロバイダーはTwitter、Google, Github
      signInOptions: [
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ]
    };
    //ここまで設定

    //FirebaseUIのインスタンス作成
    //参照:(https://github.com/firebase/firebaseui-web/issues/216#issuecomment-459302414)
    //インスタンスの重複は許されないためすでに作成済みかチェック
    //(ログイン後->ログアウトで再呼び出し、Accountページから離脱して戻るなどをするとエラーになってた)
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    ui.start('#firebaseui-auth-container', uiConfig);
  }
};
</script>
