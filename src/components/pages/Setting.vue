<template>
  <div class="Setting">
    <header-navi :path="path" :icon="icon" :title="title" />
    <div class="mx-auto jumbotron mt-3">
      <label>UIカラー</label>
      <input
        v-model="uiColor"
        type="text"
        class="mx-auto col-10 form-control"
      />
      <label>背景カラー</label>
      <input
        v-model="bgColor"
        type="text"
        class="mx-auto col-10 form-control"
      />
      <label>ログイン情報の保持</label>
      <input
        v-model="loginType"
        type="text"
        class="mx-auto col-10 form-control"
      />
    </div>
    <footer-navi />
  </div>
</template>

<script>
export default {
  data() {
    return {
      uiColor: 'green',
      bgColor: 'white',
      loginType: 'local',
      path: null,
      title: 'Setting',
      icon: 'settings_applications'
    };
  }
};
</script>

<style scoped>
.jumbotron {
  background-color: rgba(0, 0, 0, 0);
}
</style>
