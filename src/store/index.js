import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: false,
    userData: {},
    colorSetting: null,
    loginSetting: null
  },
  getters: {
    userData(state) {
      return state.userData;
    },
    status(state) {
      return state.status;
    },
    colorSetting(state) {
      return state.colorSetting;
    },
    loginSetting(state) {
      return state.loginSetting;
    }
  },
  mutations: {
    onAuthStateChanged(state, user) {
      state.userData = user;
    },
    onUserStatusChanged(state, status) {
      state.status = status;
    },
    onSetUserSetting(state) {
      let userSetting = localStorage.getItem('userSetting');
      if (userSetting) {
        const setting = JSON.parse(userSetting);
        state.colorSetting = setting.uiColor;
        state.loginSetting = setting.loginType;
      }
    }
  }
});
