<template>
  <div class="header">
    <div class="bg-success mx-auto d-flex justify-content-around text-white">
      <div class="col-1">
        <div v-if="path !== null" class="my-auto h1" @click="jump(path)">
          &lt;
        </div>
      </div>
      <h1 class="col-8">
        <i class="material-icons mb-2">
          {{ icon }}
        </i>
        {{ title }}
      </h1>
      <div class="my-auto col-1">
        <img
          v-if="status !== false"
          :src="userData.photoURL"
          class="rounded-circle"
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
    }
  },
  watch: {
    status() {
      if (this.status !== false) {
        this.$router.push('/chatroom');
      }
    }
  },
  methods: {
    jump(url) {
      this.$router.push(url);
    }
  }
};
</script>
