<template>
  <div class="LogoutForm">
    <!--ログイン時に表示されるUI-->
    <img :src="user.photoURL" class="mx-auto user-icon" />
    <p class="h2">こんにちは!<br />{{ user.displayName }}さん</p>
    <div class="d-flex flex-column">
      <button
        class="mx-auto mt-2 col-7 col-md-3 btn"
        :style="{ 'background-color': colorSetting }"
        @click="logOut()"
      >
        <span class="material-icons">exit_to_app</span>
        LogOut
      </button>

      <button
        class="mx-auto mt-2 col-7 col-md-3 btn"
        :style="{ 'background-color': colorSetting }"
        @click="updateUserInfo()"
      >
        <span class="material-icons">
          autorenew
        </span>
        ユーザー情報更新
      </button>
    </div>
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
    },
    updateUserInfo() {
      this.$emit('updateUserInfo');
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

.material-icons {
  font-size: 20px;
  padding: 0;
  margin: 0;
}
</style>
