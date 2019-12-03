<template>
  <div class="Chat">
    <header-navi :path="path" :icon="icon" :title="title" />
    <div class="mx-auto jumbotron mt-4">
      <div v-if="!status">
        ログインしてください。
      </div>
      <div v-else-if="!passState">
        読み込み中
      </div>
      <div v-else-if="!passThrough">
        <PassForm
          :pass="pass"
          :colorsetting="colorSetting"
          @checkPassWord="checkPassWord"
        />
      </div>
      <div v-else>
        <ChatList :chatlist="chatList" />
        <ChatForm :colorsetting="colorSetting" @sendMessage="sendMessage" />
      </div>
    </div>
  </div>
</template>

<script>
import ChatList from './parts/ChatList';
import PassForm from './parts/PassForm';
import ChatForm from './parts/ChatForm';
import FireBase from '@/components/js/firebase.js';
import * as firebase from 'firebase/app';
import 'firebase/database';
const moment = require('moment');
moment.locale('ja');

let DB;

export default {
  name: 'Chat',
  components: {
    PassForm,
    ChatForm,
    ChatList
  },
  data() {
    return {
      chatList: [],
      pass: null,
      passThrough: false,
      path: '/chatroom',
      title: 'Chat',
      icon: 'chat'
    };
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
    status() {
      return this.$store.getters.status;
    },
    colorSetting() {
      const COLOR = this.$store.getters.colorSetting;
      if (COLOR === null) {
        return 'forestgreen';
      }
      return COLOR;
    },
    passState() {
      if (this.pass === 'NONE') {
        //パスワードの設定無し
        this.checkPassWord();
        return true;
      } else if (
        (this.pass !== null && typeof this.pass !== 'undefined') ||
        this.passThrough
      ) {
        //パスワードデータを取得し終えた。もしくはパスワードがあっている。
        return true;
      } else {
        //パスワードデータを取得中
        return false;
      }
    }
  },
  created() {
    //認証
    FireBase.onAuth();
    //json(WebStrageの設定情報)の読み出し
    this.$store.commit('onSetUserSetting');
    //データベース問い合わせるためのオブジェクト
    DB = firebase.database();
    //パスワード取得
    let self = this;
    const GET_PASSWORD = DB.ref(`Chat/${this.$route.params.id}/roompass`);
    GET_PASSWORD.once('value').then(function(snap) {
      self.pass = snap.val();
    });
    //チャットデータ取得
    const GET_MESSAGE = DB.ref(`Chat/${this.$route.params.id}/messagelist`);
    if (this.userData) {
      GET_MESSAGE.limitToLast(10).on('child_added', this.addList);
    } else {
      GET_MESSAGE.limitToLast(10).off('child_added', this.addList);
    }
  },
  methods: {
    addList(snap) {
      const CHAT_INFO = snap.val();
      this.chatList.push({
        key: snap.key,
        name: CHAT_INFO.name,
        image: CHAT_INFO.image,
        message: CHAT_INFO.message,
        date: CHAT_INFO.date
      });
      this.scrollBottom();
    },
    sendMessage(inputMessage) {
      if (this.userData.uid) {
        const DATE = this.getDateTime();
        DB.ref(`Chat/${this.$route.params.id}/messagelist`).push({
          name: this.userData.displayName,
          uid: this.userData.uid,
          image: this.userData.photoURL,
          message: inputMessage,
          date: DATE
        });
      }
    },
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    },
    checkPassWord() {
      this.passThrough = true;
    },
    getDateTime() {
      const DATE_TIME = moment().format('YYYY/MM/DD HH:mm');
      return DATE_TIME;
    }
  }
};
</script>
