<template>
  <div class="Chat">
    <h1>{{ roomInfo.name }}</h1>
    <div v-if="roomInfo.pass != null && islock">
      <PassForm :pass="roomInfo.pass" @doPassReset="doPassReset" />
    </div>
    <div v-else>
      <ChatBox :chat-lists="ChatList"></ChatBox>
      <div class="input-group">
        <textarea
          v-model="InputChat"
          placeholder="書き込みたい内容を入れてください。"
          class="form-control"
        ></textarea>
        <div class="input-group-append">
          <button class="btn btn-success" type="button" @click="doSend()">
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatBox from '@/components/parts/chatbox';
import PassForm from '@/components/parts/passform';
import roomstore from '@/components/js/store.js';
import firebase from 'firebase/app';
import 'firebase/database';

export default {
  name: 'Chat',
  components: {
    PassForm,
    ChatBox
  },
  data() {
    return {
      InputChat: null,
      ChatList: [],
      roomInfo: roomstore.roomInfo
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
    doSend() {
      if (this.userData.uid && this.InputChat.length) {
        const date = this.getDate();
        firebase
          .database()
          .ref(`Chat/${this.roomInfo.path}/messagelist`)
          .push({
            name: this.userData.displayName,
            uid: this.userData.uid,
            image: this.userData.photoURL,
            message: this.InputChat,
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
      this.roomInfo.pass = false;
    },
    getDate() {
      const today = new Date();
      let date =
        today.getFullYear() +
        '/' +
        (today.getMonth() + 1) +
        '/' +
        today.getDate();
      let time = '[' + today.getHours() + ':' + today.getMinutes() + ']';
      return date + time;
    }
  }
};
</script>

<style scoped>
.input-group {
  position: fixed;
  bottom: 0px;
  width: 100%;
}

textarea {
  font-size: 16px; /*フォームの拡大防止*/
  height: 35px;
  resize: none;
}
</style>
