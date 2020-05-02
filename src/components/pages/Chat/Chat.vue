<template>
  <div class="Chat">
    <!--チャットページ-->
    <header>
      <header-navi
        :path="path"
        :icon="icon"
        :title="title"
        :color-setting="colorSetting"
      />
    </header>
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
          :color-setting="colorSetting"
          @checkPassWord="checkPassWord"
        />
      </div>
      <div v-else>
        <ChatList :chat-list="chatList" />
        <ChatForm :color-setting="colorSetting" @sendMessage="sendMessage" />
      </div>
    </div>
  </div>
</template>

<script>
import ChatList from './parts/ChatList';
import PassForm from './parts/PassForm';
import ChatForm from './parts/ChatForm';
import auth from '@/components/FireBase/auth.js';
import db from '@/components/FireBase/db.js';
// 参考:(https://github.com/taylorhakes/fecha#use-it)

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
    user() {
      return this.$store.getters['auth/user'];
    },
    status() {
      return this.$store.getters['auth/status'];
    },
    colorSetting() {
      const COLOR = this.$store.getters['setting/colorSetting'];
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
  methods: {
    addList(snap) {
      this.scrollBottom();
    },
    sendMessage(inputMessage) {
      const MESSAGE = {
        name: this.user.displayName,
        uid: this.user.uid,
        image: this.user.photoURL,
        message: inputMessage,
        date: new Date()
      };
      db.postChat(MESSAGE);
    },
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    },
    checkPassWord() {
      this.passThrough = true;
    }
  }
};
</script>
