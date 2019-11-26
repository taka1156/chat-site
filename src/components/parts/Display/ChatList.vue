<template>
  <div class="Chatbox">
    <div v-if="chatLists != null" class="mb-4">
      <div v-for="chatObj in chatLists" :key="chatObj.key">
        <!--Chat-->
        <chat-ballon :chatobj="chatObj" class="mb-3 border" />
      </div>
    </div>
  </div>
</template>

<script>
import ChatBalloon from '@/components/parts/Display/ChatBalloon';

export default {
  components: {
    'chat-ballon': ChatBalloon
  },
  props: {
    chatLists: null
  }
};
</script>
