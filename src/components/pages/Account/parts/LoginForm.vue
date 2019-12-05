<template>
  <div class="LoginForm">
    <div v-for="(item, index) in loginProviderList" :key="index">
      <button
        type="button"
        class="mt-2 btn"
        :style="{ 'background-color': colorsetting }"
        @click="logIn(item.providerName)"
      >
        <img :src="item.providerIcon" width="30px" height="30px" />
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

<style scoped></style>
