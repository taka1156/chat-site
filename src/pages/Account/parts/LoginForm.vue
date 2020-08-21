<template>
  <div class="LoginForm">
    <!--ログアウト時に表示されるUI-->
    <div class="mx-auto user-icon" />
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

<style scoped>
.user-icon {
  height: 100px;
  width: 100px;
  border-radius: 100px;
  border: solid 2px #d8d8d8;
  background-color: lightgray;
}
</style>
