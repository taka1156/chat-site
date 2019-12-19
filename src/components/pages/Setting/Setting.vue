<template>
  <div class="Setting">
    <header-navi
      :path="path"
      :icon="icon"
      :title="title"
      :colorsetting="colorSetting"
    />
    <div class="mx-auto jumbotron mt-4">
      <label>UIカラー</label>
      <select v-model="userSetting.uiColor" class="mx-auto col-10 form-control">
        <option v-for="(choice, index) in colorList" :key="index">
          {{ choice }}
        </option>
      </select>
      <label>ログイン情報の保持</label>
      <select
        v-model="userSetting.loginType"
        class="mx-auto col-10 form-control"
      >
        <option v-for="(choice, index) in loginTypeList" :key="index">
          {{ choice }}
        </option>
      </select>
      <div class="mx-auto mt-3 col-8 d-flex justify-content-between">
        <button
          type="button"
          class="btn col-4"
          :style="{ 'background-color': colorSetting }"
          @click="resetSetting()"
        >
          Reset
        </button>
        <button
          type="button"
          class="btn col-4"
          :style="{ 'background-color': colorSetting }"
          @click="saveSetting()"
        >
          OK
        </button>
      </div>
    </div>
    <footer-navi :colorsetting="colorSetting" />
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
      loginTypeList: ['local', 'session', 'none'],
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
      const COLOR = this.$store.getters.colorSetting;
      if (COLOR === null) {
        return 'forestgreen';
      }
      return COLOR;
    },
    loginSetting() {
      const LOGINTYPE = this.$store.getters.loginSetting;
      if (LOGINTYPE === null) {
        return 'local';
      }
      return LOGINTYPE;
    }
  },
  mounted() {
    //初期値をフォームに反映
    this.$store.commit('onSetUserSetting');
    this.userSetting.uiColor = this.colorSetting;
    this.userSetting.loginType = this.loginSetting;
  },
  methods: {
    saveSetting() {
      localStorage.setItem('userSetting', JSON.stringify(this.userSetting));
      this.$store.commit('onSetUserSetting');
    },
    resetSetting() {
      this.userSetting.uiColor = 'forestgreen';
      this.userSetting.loginType = 'local';
      this.saveSetting();
    }
  }
};
</script>
