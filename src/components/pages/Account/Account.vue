<template>
  <div class="Account">
    <header>
      <header-navi
        :path="path"
        :icon="icon"
        :title="title"
        :color-setting="colorSetting"
      />
    </header>
    <div class="mx-auto jumbotron mt-4">
      <div v-if="status" class="mt-5">
        <LogoutForm
          :user="user"
          :color-setting="colorSetting"
          @logOut="logOut"
        />
      </div>
      <div v-else class="mt-5">
        <LoginForm />
      </div>
    </div>
    <footer>
      <footer-navi :color-setting="colorSetting" />
    </footer>
  </div>
</template>

<script>
import auth from '@/components/FireBase/auth.js';
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
    user() {
      return this.$store.getters['auth/user'];
    },
    status() {
      return this.$store.getters['auth/status'];
    },
    colorSetting() {
      const COLOR = this.$store.getters['setting/colorSetting'];

      if (COLOR === null) {
        return 'forestgreen';
      }
      return COLOR;
    }
  },
  methods: {
    logOut() {
      auth.logOut();
    }
  }
};
</script>
