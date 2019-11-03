<template>
  <div class="Account">
    <header-navi :path="path" :icon="icon" :title="title" />
    <div class="mx-auto jumbotron mt-3">
      <div v-if="status">
        <div class="d-flex flex-column">
          <img :src="userData.photoURL" class="mx-auto user-icon" />
          <p class="h2">こんにちは! {{ userData.displayName }}さん</p>
          <button
            class="mx-auto mb-3 btn btn-success"
            type="button"
            @click="logOut()"
          >
            <div class="d-flex flex-row">
              <i class="material-icons">exit_to_app</i>
              LogOut
            </div>
          </button>
          <button
            class="mx-auto mb-3 btn btn-success"
            type="button"
            @click="UpdateInfo()"
          >
            <div class="d-flex flex-row">
              <i class="material-icons">autorenew</i>
              Update
            </div>
          </button>
        </div>
      </div>
      <div v-else class="mt-5">
        <button class="mx-auto btn btn-success" type="button" @click="logIn()">
          <img src="@/assets/twitter.svg" height="30px" width="30px" />
          login
        </button>
      </div>
    </div>
    <footer-navi />
  </div>
</template>

<script>
import FireBase from '@/components/js/firebase.js';

export default {
  name: 'Account',
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
  },
  methods: {
    logIn() {
      FireBase.logIn();
    },
    logOut() {
      FireBase.logOut();
    },
    UpdateInfo() {
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

.jumbotron {
  background-color: rgba(0, 0, 0, 0);
}
</style>
