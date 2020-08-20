<template>
  <div class="LogoutForm">
    <!--ログイン時に表示されるUI-->
    <img :src="user.photoURL" class="mx-auto user-icon" />
    <p class="h2">こんにちは!<br>{{ user.displayName }}さん</p>
    <button
      type="button"
      class="mx-auto mt-2 col-3 btn d-flex justify-content-center"
      :style="{ 'background-color': colorSetting }"
      @click="logOut()"
    >
      <i class="material-icons">exit_to_app</i>
      LogOut
    </button>
  </div>
</template>

<script>
export default {
  name: 'LogoutForm',
  props: {
    user: {
      type: Object,
      default: () => {},
      required: true
    },
    colorSetting: {
      type: String,
      default: () => {},
      required: true
    }
  },
  methods: {
    logOut() {
      this.$emit('logOut');
    }
  }
};
</script>

<style scoped>
.user-icon {
  height: 100px;
  width: 100px;
  border-radius: 100px;
  border: solid 2px #d8d8d8;
}
</style>
