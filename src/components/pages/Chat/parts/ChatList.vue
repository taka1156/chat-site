<template>
  <div class="Chatbox">
    <div v-if="chatlist != null" class="mb-4">
      <div v-for="chatObj in chatlist" :key="chatObj.key">
        <!--Chat-->
        <chat-ballon :chatobj="chatObj" class="mb-3" />
      </div>
    </div>
  </div>
</template>

<script>
import ChatBalloon from './ChatBalloon';

export default {
  components: {
    'chat-ballon': ChatBalloon
  },
  props: {
    chatlist: null
  }
};
</script>
