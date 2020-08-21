const state = {
  user: null,
};

const getters = {
  user(state) {
    return state.user;
  },
  status(state) {
    return state.user !== null;
  }
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
