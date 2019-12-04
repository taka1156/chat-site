<template>
  <div class="LogoutForm">
    <!--ログアウト時に表示されるUI-->
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
let firebase = require('firebase/app');
let firebaseui = require('firebaseui-ja');
require("firebaseui-ja/dist/firebaseui.css");

export default {
  data(){
    return {
      ui: null
    }
  },
  created(){
    let uiConfig = {
      callbacks: {
            signInSuccessWithAuthResult: function(currentUser) {
                store.commit('onAuthStateChanged', currentUser);
                store.commit('onUserStatusChanged', true);
                return true;
            },
        },
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID
        ]
    };
    //参照:(https://github.com/firebase/firebaseui-web/issues/216#issuecomment-459302414)
    this.ui = firebaseui.auth.AuthUI.getInstance();
    if(!this.ui){
      this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    this.ui.start('#firebaseui-auth-container', uiConfig);
  }
};
</script>
