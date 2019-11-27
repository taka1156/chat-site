<template>
  <div class="ChatForm">
    <div class="form-box" :style="{ height: boxHeight }">
      <div class="my-2 d-flex justify-content-center">
        <textarea
          v-model="inputMessage"
          placeholder="ctrl + Enterで送信。"
          class="col-8 form-control"
          :rows="rows"
          @keydown.ctrl.enter="doSend()"
        />
        <button-form class="col-3" @callFunc="doSend()">Send</button-form>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonForm from '@/components/parts/Form/ButtonForm';
const DEFAULT_HEIGHT = 50;
const ROW_PER_HEIGHT = 25;

export default {
  name: 'ChatFrom',
  components: {
    'button-form': ButtonForm
  },
  data() {
    return {
      inputMessage: ''
    };
  },
  computed: {
    rows() {
      if (this.inputMessage === '') {
        return 1;
      }
      const num = this.inputMessage.split('\n').length;
      return num < 5 ? num : 5;
    },
    boxHeight() {
      return `${(this.rows - 1) * ROW_PER_HEIGHT + DEFAULT_HEIGHT}px`;
    }
  },
  methods: {
    doSend() {
      if (this.inputMessage.length <= 200 && this.inputMessage.length > 0) {
        const CHAT_MESSAGE = this.inputMessage;
        this.inputMessage = '';
        this.$emit('doSend', CHAT_MESSAGE);
      }
    }
  }
};
</script>

<style scoped>
.form-box {
  position: fixed;
  background-color: lightgray;
  height: 50px;
  width: 100%;
  right: 0px;
  bottom: 0px;
}
</style>
