<template>
  <div class="formgroup">
    <!--button-->
    <button-form @callFunc="init()">
      チャット部屋を作る
    </button-form>
    <!--modal-->
    <div v-show="isModal">
      <div class="modal-form">
        <div class="mx-auto col-10">
          <div class="modal-header">
            <h5 class="modal-title">
              テーブル作成
            </h5>
          </div>
          <div class="modal-body">
            <label>タイトル</label>
            <input
              v-model="inputTitle"
              type="text"
              class="form-control"
              placeholder="Chatのタイトル"
            />
            <label>概要</label>
            <input
              v-model="inputDetail"
              type="textarea"
              class="form-control"
              placeholder="Chatの概要(10~30字)"
            />
            <label>パスワード(任意)</label>
            <input
              v-model="inputPass"
              type="password"
              class="form-control"
              placeholder="Chatのパスワード(任意)"
            />
          </div>
          <div class="modal-footer">
            <button-form @callFunc="init()">
              キャンセル
            </button-form>
            <button-form @callFunc="makeRoom()">
              確定
            </button-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonForm from '@/components/parts/Form/ButtonForm';

export default {
  components: {
    'button-form': ButtonForm
  },
  data() {
    return {
      isModal: false,
      inputTitle: '',
      inputDetail: '',
      inputPass: null
    };
  },
  methods: {
    makeRoom() {
      this.isModal = !this.isModal;
      this.$emit('makeRoom', this.inputTitle, this.inputDetail, this.inputPass);
    },
    init() {
      this.inputTitle = this.inputDetail = '';
      this.inputPass = null;
      this.isModal = !this.isModal;
    }
  }
};
</script>

<style scoped>
.form-control {
  font-size: 16px; /*フォームの拡大防止*/
}

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
