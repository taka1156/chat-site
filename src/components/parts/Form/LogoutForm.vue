<template>
  <div class="LogoutForm">
    <button
      type="button"
      class="mx-auto mt-2 col-3 btn d-flex justify-content-center"
      :style="{ 'background-color': colorsetting }"
      @click="logIn()"
    >
      <img src="@/assets/twitter.svg" height="30px" width="30px" />
      Login
    </button>
  </div>
</template>

<script>
export default {
  props: {
    colorsetting: null
  },
  methods: {
    logIn() {
      this.$emit('logIn');
    }
  }
};
</script>
