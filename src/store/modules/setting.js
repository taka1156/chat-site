const state = {
  colorSetting: null,
  loginSetting: null
};

const getters = {
  colorSetting(state) {
    return state.colorSetting;
  },
  loginSetting(state) {
    return state.loginSetting;
  }
};

const mutations = {
  setUserSetting(state) {
    let userSetting = localStorage.getItem('userSetting');
    if (userSetting) {
      const setting = JSON.parse(userSetting);
      state.colorSetting = setting.uiColor;
      state.loginSetting = setting.loginType;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
