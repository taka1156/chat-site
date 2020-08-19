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
import { getRoom, postChat } from '@/components/FireBase/db.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
// import PassForm from './parts/PassForm';
// 参考:(https://github.com/taylorhakes/fecha#use-it)

const DB = firebase.firestore();

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
  async mounted() {
    if (this.status) {
      this.room = await getRoom(this.roomId);
      console.log(this.room);
      // イベント検知
      const chatDocRef = await DB.collection('room').doc(this.roomId);
      this.chatRef = chatDocRef.collection('chat').onSnapshot(() => {
        this.getChats();
      });
    }
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
    async getChats() {
      const roomDocRef = await DB.collection('room').doc(this.roomId);
      const chatColRef = await roomDocRef.collection('chat');
      const chatColQuery = await chatColRef.orderBy('date', 'desc').limit(20);

　　　// TODO: 初期化して全てのデータを取得すると言う処理になってしまっているので差分だけ取れないか調べる
     this.chatList = [];
      await chatColQuery.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added'){
            this.chatList.push(change.doc.data());
          }
        });
      });

      this.scrollBottom();
    }
  }
};
</script>
