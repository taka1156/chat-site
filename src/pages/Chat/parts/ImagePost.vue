<template>
  <div class="ImagePost">
    <!--画像投稿フォーム-->
    <div v-show="isOpen">
      <div class="modal-form">
        <fieldset class="mx-auto col-11">
          <div class="modal-header">
            <legend class="modal-title">画像投稿</legend>
          </div>
          <form @submit.prevent>
            <div class="mt-1">
              <div class="modal-body">
                <div class="d-flex flex-column">
                  <label class="mx-auto file-label">
                    <input
                      type="file"
                      class="file-input-none"
                      @change="selectImage"
                    />
                    画像を選択
                  </label>
                  <div class="mx-auto h-50 w-50">
                    <img :src="previewImage" class="img-thumbnail" />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn col-6"
                :style="{ 'background-color': colorSetting }"
                @click="init()"
              >
                キャンセル
              </button>
              <button
                type="submit"
                class="btn col-6"
                :style="{ 'background-color': colorSetting }"
                @click="init()"
              >
                確定
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagePost',
  props: {
    isOpen: {
      default: false,
      type: Boolean
    },
    colorSetting: {
      default: null,
      type: String
    }
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
      this.$emit('close-modal', false);
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

.file-input-none {
  display: none;
}

.file-label {
  width: 80%;
  border: solid 2px gray;
}
</style>
