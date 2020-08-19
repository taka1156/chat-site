<template>
  <div class="Chatbox">
    <!--チャットを一覧表示-->
    <div v-if="chatList.length !== 0" class="mb-4">
      <div v-for="(chat, index) in reverseChatList" :key="index">
        <!--Chat-->
        <chat-ballon :chat="chat" class="mb-3" />
        <!--<image-display imageurl="chatObj.imgurl" class="mb-3" />-->
      </div>
    </div>
  </div>
</template>

<script>
import ChatBalloon from './ChatBalloon';
//import ImageDisplay from './ImageDisplay';

export default {
  components: {
    'chat-ballon': ChatBalloon
    //'image-display': ImageDisplay
  },
  props: {
    chatList: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {
    reverseChatList() {
       return this.chatList.reverse();
    }
  }
};
</script>
