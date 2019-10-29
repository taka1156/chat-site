<template>
  <div class="Account">
    <h1>Your account status</h1>
    <div v-if="status">
      <div class="d-flex flex-column">
        <img :src="userData.photoURL" class="mx-auto user-icon" />
        <h1>こんにちは! {{ userData.displayName }}さん</h1>
        <button class="mx-auto btn btn-success" type="button" @click="logOut()">
          LogOut
        </button>
      </div>
    </div>
    <div v-else>
      <button class="mx-auto btn btn-success" type="button" @click="logIn()">
        TwitterLogin
      </button>
    </div>
  </div>
</template>

<script>
import FireBase from '@/components/js/firebase.js';

export default {
  name: 'Account',
  data() {
    return {
      user: {}
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
