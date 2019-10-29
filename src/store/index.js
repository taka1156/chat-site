import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: false,
    userData: {}
  },
  getters: {
    userData(state) {
      return state.userData;
    },
    status(state) {
      return state.status;
    }
  },
  mutations: {
    onAuthStateChanged(state, user) {
      state.userData = user;
    },
    onUserStatusChanged(state, status) {
      state.status = status;
    }
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      key: 'Taka`sChatApp'
    })
  ]
});
