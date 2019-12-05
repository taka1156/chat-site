<template>
  <div class="Account">
    <header>
      <header-navi :path="path" :icon="icon" :title="title" />
    </header>
    <div class="mx-auto jumbotron mt-4">
      <div v-if="status">
        <LogoutForm
          :userdata="userData"
          :colorsetting="colorSetting"
          @logOut="logOut"
        />
      </div>
      <div v-else class="mt-5">
        <LoginForm @logIn="logIn" />
      </div>
    </div>
    <footer>
      <footer-navi />
    </footer>
  </div>
</template>

<script>
import FireBase from '@/components/js/firebase.js';
import LoginForm from './parts/LoginForm';
import LogoutForm from './parts/LogoutForm';

export default {
  name: 'Account',
  components: {
    LoginForm,
    LogoutForm
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
    },
    colorSetting() {
      const COLOR = this.$store.getters.colorSetting;

      if (COLOR === null) {
        return 'forestgreen';
      }
      return COLOR;
    }
  },
  created() {
    FireBase.onAuth();
    this.$store.commit('onSetUserSetting');
  },
  methods: {
    logOut() {
      FireBase.logOut();
    },
    logIn(provider) {
      FireBase.logIn(provider);
    }
  }
};
</script>
