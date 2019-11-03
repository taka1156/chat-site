<template>
  <div class="Setting">
    <header-navi :path="path" :icon="icon" :title="title" />
    <div class="mx-auto jumbotron mt-3">
      <label>UIカラー</label>
      <select v-model="userSetting.uiColor" class="mx-auto col-10 form-control">
        <option v-for="(color, index) in colorList" :key="index">
          {{ color }}
        </option>
      </select>
      <label>ログイン情報の保持</label>
      <select
        v-model="userSetting.loginType"
        class="mx-auto col-10 form-control"
      >
        <option
          v-for="(type, index) in ['local', 'session', 'none']"
          :key="index"
        >
          {{ type }}
        </option>
      </select>
      <button
        class="mx-2 mt-2 col-3 btn btn-success"
        :style="{ 'background-color': colorSetting }"
        type="button"
        @click="doReset()"
      >
        Reset
      </button>
      <button
        class="mx-2 mt-2 col-3 btn btn-success"
        :style="{ 'background-color': colorSetting }"
        type="button"
        @click="doSetting()"
      >
        OK
      </button>
    </div>
    <footer-navi />
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorList: [
        'red',
        'tomato',
        'green',
        'forestgreen',
        'cornflowerblue',
        'navy',
        'gold',
        'orange',
        'brown',
        'purple',
        'pink'
      ],
      userSetting: {
        uiColor: '',
        loginType: ''
      },
      path: null,
      title: 'Setting',
      icon: 'settings_applications'
    };
  },
  computed: {
    colorSetting() {
      if (this.$store.getters.colorSetting === null) {
        return 'forestgreen';
      }
      return this.$store.getters.colorSetting;
    },
    loginSetting() {
      if (this.$store.getters.loginSetting === null) {
        return 'local';
      }
      return this.$store.getters.loginSetting;
    }
  },
  created() {
    this.$store.commit('onSetUserSetting');
  },
  mounted() {
    this.userSetting.uiColor = this.colorSetting;
    this.userSetting.loginType = this.loginSetting;
  },
  methods: {
    doSetting() {
      if (this.userSetting.uiColor !== 'forestgreen') {
        localStorage.setItem('userSetting', JSON.stringify(this.userSetting));
        this.$store.commit('onSetUserSetting');
      }
    },
    doReset() {
      this.userSetting.uiColor = 'forestgreen';
      this.userSetting.loginType = 'local';
      localStorage.setItem('userSetting', JSON.stringify(this.userSetting));
      this.$store.commit('onSetUserSetting');
    }
  }
};
</script>
