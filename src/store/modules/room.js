const state = {
  rooms: [],　// 部屋一覧
  selectRooms: {} //入室した部屋(チャット画面に入った)
};

const getters = {
  rooms(state) {
    return state.rooms;
  },
  // 配列が存在するかどうか
  status(state) {
    return state.rooms.length ? true : false;
  }
};

const mutations = {
  setRooms(state, rooms) {
    // 部屋一覧の登録
    for (let room of rooms) {
      state.rooms.push(room);
    }
  },
  setRoom(state, roomNo) {
    // 入室
    state.selectRooms = state.rooms[roomNo];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
