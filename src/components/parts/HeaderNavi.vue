<template>
  <div class="HeaderNavi">
    <div
      class="mx-auto col-12 d-flex justify-content-around text-white fixed-top"
      :style="{ 'background-color': colorSetting }"
    >
      <div class="col-1">
        <div v-if="path !== null" class="my-auto h2" @click="jump(path)">
          &lt;
        </div>
      </div>
      <h1 class="h2 col-8">
        <i class="material-icons">
          {{ icon }}
        </i>
        {{ title }}
      </h1>
      <div class="my-auto col-2">
        <img
          v-if="status !== false"
          :src="userData.photoURL"
          class="rounded-circle"
          @click="jump('/account')"
        />
        <button
          v-else
          class="btn btn-outline-light btn-login"
          @click="jump('/account')"
        >
          login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: null,
    icon: null,
    title: null
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
    status() {
      return this.$store.getters.status;
    },
    colorSetting() {
      if (this.$store.getters.colorSetting === null) {
        return 'forestgreen';
      }
      return this.$store.getters.colorSetting;
    }
  },
  methods: {
    jump(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style scoped>
.btn-login {
  border: solid 0.5px white;
}
</style>
