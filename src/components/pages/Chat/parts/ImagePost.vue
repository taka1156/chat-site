<template>
  <div class="ImagePost">
    <div v-show="isPostModal">
      <div class="modal-form">
        <div class="mx-auto col-11">
          <div class="modal-header">
            <h5 class="modal-title">
              画像投稿
            </h5>
          </div>
          <form>
            <div class="mt-1">
              <div class="modal-body">
                <input
                  id="customFile"
                  type="file"
                  class="custom-file-input"
                  @change="selectImage"
                />
                <label class="custom-file-label" for="customFile"
                  >Choose file</label
                >
                <img :src="previewImage" class="img-fluid" />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn col-6"
                :style="{ 'background-color': colorsetting }"
                @click="init()"
              >
                キャンセル
              </button>
              <button
                type="submit"
                class="btn col-6"
                :style="{ 'background-color': colorsetting }"
                @click="changeModalState()"
              >
                確定
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagePost',
  props: {
    isPostModal: {
      default: false,
      type: Boolean
    },
    colorsetting: null
  },
  data() {
    return {
      previewImage: null
    };
  },
  methods: {
    init() {
      this.previewImage = null;
      this.closeModal();
    },
    selectImage(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    closeModal() {
      this.$emit('closeModal', false);
    }
  }
};
</script>

<style scoped>
.modal-form {
  height: 85vh;
  width: 100vw;
  top: 50px;
  left: 0;
  z-index: 3;
  position: fixed;
  background-color: white;
}
</style>
