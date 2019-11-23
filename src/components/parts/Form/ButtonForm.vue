<template>
  <div class="ButtonForm">
    <button
      type="button"
      class="btn"
      :style="{ 'background-color': colorSetting }"
      @click="callFunc()"
    >
      <div class="d-flex justify-content-center">
        <slot></slot>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    colorSetting() {
      const COLOR = this.$store.getters.colorSetting;
      if (COLOR === null) {
        return 'forestgreen';
      }
      return COLOR;
    }
  },
  methods: {
    callFunc() {
      this.$emit('callFunc');
    }
  }
};
</script>
