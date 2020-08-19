/* eslint-disable no-new */
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import auth from '@/components/FireBase/auth.js';
import FooterNavi from '@/components/navi/FooterNavi';
import HeaderNavi from '@/components/navi/HeaderNavi';
import '@/components/css/layout.css';
import InfiniteLoading from 'vue-infinite-loading';
Vue.use(InfiniteLoading);

Vue.component('footer-navi', FooterNavi);
Vue.component('header-navi', HeaderNavi);
auth.initAuth();
auth.onAuth();

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
