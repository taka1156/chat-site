<template>
  <div class="pass">
    <!--パスワード入力画面-->
    <form @submit.prevent>
      <label for="inputPass">パスワード</label>
      <div class="input-group">
        <input
          id="inputPass"
          v-model="InputPass"
          type="text"
          class="form-control"
          placeholder="Chatのパスワード"
          @keydown.ctrl.enter="checkPassWord()"
        />
        <div class="input-group-append">
          <button
            type="submit"
            class="btn"
            :style="{ 'background-color': colorsetting }"
            @click="checkPassWord()"
          >
            確定
          </button>
        </div>
      </div>
    </form>
    <div v-if="msg != null">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: 'PassForm',
  props: {
    pass: {
      default: null,
      type: String
    },
    colorsetting: {
      default: null,
      type: String
    }
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
