import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth.js'
import room from './modules/room.js'
import chat from './modules/chat.js'
import setting from './modules/setting.js'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: auth,
    room: room,
    chat: chat,
    setting: setting,
  }
});
