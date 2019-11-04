/* eslint-disable no-new */
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import FireBase from '@/components/js/firebase.js';
import FooterNavi from '@/components/parts/FooterNavi';
import HeaderNavi from '@/components/parts/HeaderNavi';
import layout from '@/css/layout.css';
Vue.use(layout);
Vue.component('footer-navi', FooterNavi);
Vue.component('header-navi', HeaderNavi);
FireBase.initAuth();

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.Auth) && !store.getters.status) {
    next({ path: '/account', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
