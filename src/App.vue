<template>
  <div id="app">
    <div class="mx-auto">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    //json(WebStrageの設定情報)の読み出し
    this.$store.commit('setting/setUserSetting');
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>
