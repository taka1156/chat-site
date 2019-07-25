import Vue from 'vue';
import App from './App';
import router from './router';
import Vuetify,{} from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify);

//ナビゲーションバー
import Navi from '@/components/parts/navi';
Vue.component('navi-ber',Navi);

import * as firebase from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  databaseURL: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  storageBucket: "",
  messagingSenderId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
