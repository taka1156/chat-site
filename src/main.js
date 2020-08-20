/* eslint-disable no-new */
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './plugins'

import '@/components/css/layout.css';



Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
