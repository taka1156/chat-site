/* eslint-disable no-new */
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import FireBase from '@/components/js/firebase.js';
import store from './store';
import Navi from '@/components/parts/navi';
Vue.use(Vuetify);
Vue.component('navi-ber', Navi);
FireBase.initAuth();

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
