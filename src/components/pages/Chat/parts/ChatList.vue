<template>
  <div class="Chatbox">
    <!--チャットを一覧表示-->
    <div v-if="chatlist != null" class="mb-4">
      <div v-for="(message, index) in chatList" :key="index">
        <!--Chat-->
        <chat-ballon :message="message" class="mb-3" />
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
      default: () => []
    }
  }
};
</script>
