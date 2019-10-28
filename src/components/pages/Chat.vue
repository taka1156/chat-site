<template>
  <div class="Chat">
    <h1>{{ title }}</h1>

    <div v-if="pass != null">
      <PassForm :pass="pass" @doPassReset="doPassReset"></PassForm>
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
import str from '@/components/js/store';
import * as firebase from 'firebase/app';
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
      user: str.UserInfo,
      pass: str.PassWord,
      title: str.Title
    };
  },
  created() {
    const Message = firebase.database().ref(`Chat/${str.RoomName}/messagelist`);
    if (this.user) {
      this.ChatList = [];
      // message に変更があったときのハンドラを登録
      Message.limitToLast(10).on('child_added', this.addList);
    } else {
      // message に変更があったときのハンドラを解除
      Message.limitToLast(10).off('child_added', this.addList);
    }
  },
  methods: {
    addList(snap) {
      const ChatInfo = snap.val();
      let flag;
      if (ChatInfo.uid == this.user.uid) {
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
      if (this.user.uid && this.InputChat.length) {
        // firebase にメッセージを追加
        const dateStr = this.getDate();
        firebase
          .database()
          .ref(`Chat/${str.RoomName}/messagelist`)
          .push(
            {
              name: this.user.displayName,
              uid: this.user.uid,
              image: this.user.photoURL,
              message: this.InputChat,
              date: dateStr
            },
            () => {
              this.InputChat = null;
            }
          );
      }
    },
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    },
    doPassReset() {
      this.pass = null;
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
      console.log(date + time);
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
