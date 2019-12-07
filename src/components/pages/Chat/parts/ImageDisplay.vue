<template>
  <div class="ImageDisplay">
    <img src="imageUrl" class="img-fluid" />
  </div>
</template>

<script>
export default {
  name: 'ImageDisplay',
  props: {
    imageUrl: null
  }
};
</script>
