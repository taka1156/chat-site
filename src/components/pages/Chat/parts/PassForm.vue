<template>
  <div class="pass">
    <label>パスワード</label>
    <div class="input-group">
      <input
        v-model="InputPass"
        type="text"
        class="form-control"
        placeholder="Chatのパスワード"
        @keydown.ctrl.enter="checkPassWord()"
      />
      <div class="input-group-append">
        <button
          type="button"
          class="btn"
          :style="{ 'background-color': colorsetting }"
          @click="checkPassWord()"
        >
          確定
        </button>
      </div>
    </div>
    <div v-if="msg != null">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: 'PassForm',
  props: {
    pass: null,
    colorsetting: null
  },
  data() {
    return {
      InputPass: null,
      msg: null
    };
  },
  methods: {
    checkPassWord() {
      if (this.InputPass == this.pass) {
        this.$emit('checkPassWord');
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
