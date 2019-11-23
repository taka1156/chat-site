<template>
  <div class="pass">
    <label>パスワード</label>
    <div class="input-group">
      <input
        v-model="InputPass"
        type="text"
        class="form-control"
        placeholder="Chatのパスワード"
        @keydown.ctrl.enter="checkPass()"
      />
      <div class="input-group-append">
        <button-form @callFunc="checkPass()">
          確定
        </button-form>
      </div>
    </div>
    <div v-if="msg != null">{{ msg }}</div>
  </div>
</template>

<script>
import ButtonForm from '@/components/parts/Form/ButtonForm';

export default {
  name: 'PassForm',
  components: {
    'button-form': ButtonForm
  },
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
    checkPass() {
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
