<template>
  <div class="Setting">
    <header-navi :path="path" :icon="icon" :title="title" />
    <label>UIカラー</label>
    <input v-model="uiColor" type="text" class="mx-auto col-10 form-control" />
    <label>背景カラー</label>
    <input v-model="bgClor" type="text" class="mx-auto col-10 form-control" />
    <label>ログイン情報の保持</label>
    <input
      v-model="loginType"
      type="text"
      class="mx-auto col-10 form-control"
    />
    <footer-navi />
  </div>
</template>

<script>
export default {
  data() {
    return {
      uiColor: 'green',
      bgClor: 'White',
      loginType: 'local',
      path: null,
      title: 'Setting',
      icon: 'settings_applications'
    };
  }
};
</script>
