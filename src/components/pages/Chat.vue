<template>
  <div class="Chat">
    <header-navi :path="path" :icon="icon" :title="title" />
    <div class="mx-auto jumbotron mt-3">
      <div v-if="roomInfo.pass != null">
        <PassForm :pass="roomInfo.pass" @doPassReset="doPassReset" />
      </div>
      <div v-else>
        <ChatBox :chat-lists="ChatList"></ChatBox>
        <ChatForm @doSend="doSend" />
      </div>
    </div>
  </div>
</template>

<script>
import ChatBox from '@/components/parts/chatbox';
import PassForm from '@/components/parts/passform';
import ChatForm from '@/components/parts/chatfrom';
import roomstore from '@/components/js/store.js';
import * as firebase from 'firebase/app';
import 'firebase/database';
const moment = require('moment');
moment.locale('ja');

export default {
  name: 'Chat',
  components: {
    PassForm,
    ChatForm,
    ChatBox
  },
  data() {
    return {
      ChatList: [],
      roomInfo: roomstore.roomInfo,
      path: '/chatroom',
      title: roomstore.roomInfo.name,
      icon: 'chat'
    };
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    }
  },
  created() {
    const Message = firebase
      .database()
      .ref(`Chat/${this.roomInfo.path}/messagelist`);
    if (this.userData) {
      Message.limitToLast(10).on('child_added', this.addList);
    } else {
      Message.limitToLast(10).off('child_added', this.addList);
    }
  },
  methods: {
    addList(snap) {
      const ChatInfo = snap.val();
      let flag;
      if (ChatInfo.uid == this.userData.uid) {
        flag = true;
      } else {
        flag = false;
      }
      this.ChatList.push({
        key: snap.key,
        Chatflag: flag,
        name: ChatInfo.name,
        image: ChatInfo.image,
        message: ChatInfo.message,
        date: ChatInfo.date
      });
      this.scrollBottom();
    },
    doSend(inputMessage) {
      if (this.userData.uid) {
        const date = this.getDate();
        firebase
          .database()
          .ref(`Chat/${this.roomInfo.path}/messagelist`)
          .push({
            name: this.userData.displayName,
            uid: this.userData.uid,
            image: this.userData.photoURL,
            message: inputMessage,
            date: date
          });
        this.InputChat = null;
      }
    },
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    },
    doPassReset() {
      this.roomInfo.pass = null;
    },
    getDate() {
      const today = moment().format('YYYY/MM/DD hh:mm');
      return today;
    }
  }
};
</script>

<style scoped>
textarea {
  font-size: 16px; /*フォームの拡大防止*/
  height: 35px;
  resize: none;
}

.jumbotron {
  background-color: rgba(0, 0, 0, 0);
}
</style>
