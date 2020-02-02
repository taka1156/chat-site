<template>
  <div class="ImageDisplay">
    <!--チャット画面の画像表示のレイアウト-->
    <img src="imageUrl" class="img-fluid" />
  </div>
</template>

<script>
export default {
  name: 'ImageDisplay',
  props: {
    imageUrl: {
      default: null,
      type: String
    }
  }
};
</script>
