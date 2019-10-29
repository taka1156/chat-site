import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let Auth = new Vuex.Store({
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
  }
});

let ChatRoom = new Vuex.Store({
  state: {
    ChatRoomList: []
  },
  getters: {
    ChatRoomList(state) {
      return state.ChatRoomList;
    }
  },
  mutations: {
    addList(state, ChatInfo) {
      state.ChatRoomList.push({
        key: ChatInfo.key,
        roomname: ChatInfo.roomname,
        user: ChatInfo.user,
        detail: ChatInfo.detail,
        roompass: ChatInfo.roompass
      });
    },
    resetList(state) {
      state.ChatRoomList = [];
    }
  }
});

export default { Auth, ChatRoom };
