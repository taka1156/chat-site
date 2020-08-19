const state = {
  roomsNum: 0, //　現在の部屋の総数
  rooms: [], // 部屋一覧
  selectRoom: {}, //入室した部屋(チャット画面に入った)
};

const getters = {
  roomsNum(state) {
    return state.roomsNum;
  },
  rooms(state) {
    return state.rooms;
  },
  // 配列が存在するかどうか
  status(state) {
    return state.rooms.length ? true : false;
  }
};

const mutations = {
  // 部屋の最大数を登録
  setRoomsNum(state, roomsNum) {
    state.roomsNum = roomsNum;
  },
  setRooms(state, room) {
    // 部屋の登録
    state.rooms.push(room);
  },
  setRoom(state, roomNo) {
    // 入室
    state.selectRoom = state.rooms[roomNo];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
