<template>
  <div class="pass">
    <label>パスワード</label>
    <div class="mx-auto col-10 input-group">
      <input
        v-model="InputPass"
        type="text"
        class="form-control"
        placeholder="Chatのパスワード"
        @keydown.ctrl.enter="doCheck()"
      />
      <div class="input-group-append">
        <button class="btn btn-success" type="button" @click="doCheck()">
          確定
        </button>
      </div>
    </div>
    <div v-if="msg != null">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  props: {
    pass: null
  },
  data() {
    return {
      InputPass: null,
      msg: null
    };
  },
  methods: {
    doCheck() {
      if (this.InputPass == this.pass) {
        this.$emit('doPassReset');
      } else {
        this.msg = 'パスワードが違います。';
      }
    }
  }
};
</script>

<style scoped>
.form-control {
  font-size: 16px; /*フォームの拡大防止*/
}
</style>
