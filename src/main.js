/* eslint-disable no-new */
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import FireBase from '@/components/js/firebase.js';
import FooterNavi from '@/components/navi/FooterNavi';
import HeaderNavi from '@/components/navi/HeaderNavi';
import '@/components/css/layout.css';

Vue.component('footer-navi', FooterNavi);
Vue.component('header-navi', HeaderNavi);
FireBase.initAuth();

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
