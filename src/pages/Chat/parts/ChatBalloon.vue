<template>
  <div class="ChatBalloon">
    <!--吹き出しのレイアウト-->
    <div class="d-flex flex-column">
      <div class="chat-left">
        <img :src="chat.img" class="icon" />
        <div class="chat-balloon">
          <Nl2br tag="p" :text="chat.message"></Nl2br>
        </div>
        <p class="m-0">発言者:{{ chat.name }}</p>
        <p class="m-0">{{ dateFormat(chat.date) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Nl2br from 'vue-nl2br';
import { format } from 'fecha';

export default {
  components: {
    Nl2br
  },
  props: {
    chat: {
      type: Object,
      default: () => {},
      require: true
    }
  },
  methods: {
    dateFormat({seconds}) {
      const datetime = new Date(seconds * 1000).toLocaleString();
      return datetime.slice(0, -3);
    }
  }
};
</script>

<style scoped>
.icon {
  height: 50px;
  width: 50px;
  border-radius: 50px;
  border: solid 0.5px gray;
}

.chat-left {
  text-align: left;
}

/*吹きだし(左)*/
.chat-balloon {
  position: relative;
  display: inline-block;
  margin: 1.5em 0 0 15px;
  padding: 7px 10px;
  min-width: 120px;
  max-width: 70%;
  color: #555;
  font-size: 16px;
  background: #e0edff;
}

.chat-balloon:before {
  content: '';
  position: absolute;
  top: 50%;
  left: -30px;
  margin-top: -15px;
  border: 15px solid transparent;
  border-right: 15px solid #e0edff;
}

.chat-balloon p {
  margin: 0;
  padding: 0;
  text-align: left;
  word-wrap: break-word;
}
</style>
