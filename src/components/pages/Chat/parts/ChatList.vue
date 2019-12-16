<template>
  <div class="Chatbox">
    <div v-if="chatlist != null" class="mb-4">
      <div v-for="chatObj in chatlist" :key="chatObj.key">
        <!--Chat-->
        <chat-ballon :chatobj="chatObj" class="mb-3" />
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
    chatlist: {
      default: null,
      type: Array
    }
  }
};
</script>
