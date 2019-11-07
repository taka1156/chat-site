<template>
  <div class="Account">
    <header-navi :path="path" :icon="icon" :title="title" />
    <div class="mx-auto jumbotron mt-3">
      <div v-if="status">
        <div class="d-flex flex-column">
          <img :src="userData.photoURL" class="mx-auto user-icon" />
          <p class="h2">こんにちは! {{ userData.displayName }}さん</p>
          <button-form @callFunc="logOut">
            <i class="material-icons">exit_to_app</i>
            LogOut
          </button-form>
          <button-form @callFunc="updateInfo">
            <i class="material-icons">autorenew</i>
            Update
          </button-form>
        </div>
      </div>
      <div v-else class="mt-5">
        <button-form @callFunc="logIn">
          <img src="@/assets/twitter.svg" height="30px" width="30px" />
          Login
        </button-form>
      </div>
    </div>
    <footer-navi />
  </div>
</template>

<script>
import FireBase from '@/components/js/firebase.js';
import ButtonForm from '@/components/parts/ButtonForm';

export default {
  name: 'Account',
  components: {
    'button-form': ButtonForm
  },
  data() {
    return {
      path: '/',
      title: 'Account',
      icon: 'account_box'
    };
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
    status() {
      return this.$store.getters.status;
    }
  },
  created() {
    FireBase.onAuth();
    this.$store.commit('onSetUserSetting');
  },
  methods: {
    logIn() {
      FireBase.logIn();
    },
    logOut() {
      FireBase.logOut();
    },
    updateInfo() {
      FireBase.UpdateInfo();
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
