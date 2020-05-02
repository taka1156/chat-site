<template>
  <div class="HeaderNavi">
    <div
      class="mx-auto col-12 d-flex justify-content-around text-white fixed-top"
      :style="{ 'background-color': colorSetting }"
    >
      <div class="col-2">
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
          :src="user.photoURL"
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
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    colorSetting: {
      type: String,
      default: '',
      required: true
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
    status() {
      return this.$store.getters['auth/status'];
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
