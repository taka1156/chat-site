<template>
  <div class="LoginForm">
    <div class="mx-auto user-icon" />
    <div v-for="(item, index) in loginProviderList" :key="index">
      <button
        type="button"
        class="mt-2 btn"
        :style="{ 'background-color': colorsetting }"
        @click="logIn(item.providerName)"
      >
        <img :src="item.providerIcon" width="20px" height="20px" />
        {{ item.providerName }}でログイン
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    colorsetting: null
  },
  data() {
    return {
      loginProviderList: [
        {
          providerName: 'Twitter',
          providerIcon: require('@/assets/twitter-brands.svg')
        },
        {
          providerName: 'Google',
          providerIcon: require('@/assets/google-brands.svg')
        },
        {
          providerName: 'GitHub',
          providerIcon: require('@/assets/github-brands.svg')
        }
      ]
    };
  },
  methods: {
    logIn(provider) {
      this.$emit('logIn', provider);
    }
  }
};
</script>

<style scoped>
.user-icon {
  height: 100px;
  width: 100px;
  border-radius: 100px;
  border: solid 2px #d8d8d8;
  background-color: lightgrey;
}
</style>
