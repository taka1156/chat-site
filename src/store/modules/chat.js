const state = {
  chats: []
};

const getters = {
  chats(state) {
    return state.chats;
  },
  // 配列が存在するかどうか
  status(state) {
    return state.chats.length ? true : false;
  }
};

const mutations = {
  init(state) {
    // チャットの初期化
    state.chats = [];
  },
  setChats(state, chats) {
    // チャット一覧
    state.chats.push(chats);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
