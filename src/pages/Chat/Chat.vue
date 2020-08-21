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
      <div v-if="displayStatus === ''">
        <ChatList :chat-list="chatList" />
        <ChatForm :color-setting="colorSetting" @sendMessage="sendMessage" />
      </div>
      <div v-else>
        {{ displayStatus }}
      </div>
    </div>
  </div>
</template>

<script>
import ChatList from './parts/ChatList';
import ChatForm from './parts/ChatForm';
import auth from '@/plugins/firebase/auth.js';
import { DB, getRoom, postChat } from '@/plugins/firebase/db.js';
// import PassForm from './parts/PassForm';
// 参考:(https://github.com/taylorhakes/fecha#use-it)

const roomColRef = DB.collection('room');

export default {
  name: 'Chat',
  components: {
    // PassForm,
    ChatForm,
    ChatList
  },
  data() {
    return {
      path: '/chatroom',
      title: 'Chat',
      icon: 'chat',
      chatList: [],
      chatRef: null,
      isLoaded: false
    };
  },
  firestore() {
    return {
      chatList: roomColRef.doc(this.roomId).collection('chat').orderBy('date', 'desc').limit(20)
    }
  },
  created() {
    auth.onAuth();
  },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
    status() {
      return this.$store.getters['auth/status'];
    },
    roomId() {
      return this.$route.params.id;
    },
    colorSetting() {
      const COLOR = this.$store.getters['setting/colorSetting'];
      if (COLOR === null) {
        return 'forestgreen';
      }
      return COLOR;
    },
    displayStatus() {
      if (!this.status) {
        return 'ログインしてください。';
      } else {
        if (this.chat === null) {
          if (this.isLoaded) {
            return 'データがありません。';
          } else {
            return '読み込み中。';
          }
        } else {
          return '';
        }
      }
    }
  },
  methods: {
    async sendMessage(inputMessage) {
      const MESSAGE = {
        name: this.user.displayName,
        uid: this.user.uid,
        img: this.user.photoURL,
        message: inputMessage
      };
      await postChat(this.roomId, MESSAGE);
      this.scrollBottom();
    },
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    },
  }
};
</script>
