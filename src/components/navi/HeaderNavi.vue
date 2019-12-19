<template>
  <div class="HeaderNavi">
    <div
      class="mx-auto col-12 d-flex justify-content-around text-white fixed-top"
      :style="{ 'background-color': colorsetting }"
    >
      <div class="col-1">
        <i
          v-if="path !== null"
          class="material-icons my-auto h2"
          @click="jump(path)"
        >
          chevron_left
        </i>
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
          width="50px"
          height="50px"
          @click="jump('/account')"
        />
        <button v-else class="btn btn-outline-light" @click="jump('/account')">
          login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      default: null,
      type: String
    },
    icon: {
      default: null,
      type: String
    },
    title: {
      default: null,
      type: String
    },
    colorsetting: {
      default: null,
      type: String
    }
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
    status() {
      return this.$store.getters.status;
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
.material-icons {
  font-size: 30px;
  padding-top: 10px;
}
</style>
