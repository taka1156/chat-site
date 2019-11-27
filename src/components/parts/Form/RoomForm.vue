<template>
  <div class="formgroup">
    <!--button-->
    <button-form @callFunc="init()">
      チャット部屋を作る
    </button-form>
    <!--modal-->
    <div v-show="isModal">
      <div class="bg-cover" @click="init()" />
      <div class="modal-form mx-auto">
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
            class="mx-auto col-10 form-control"
            placeholder="Chatのタイトル"
          />
          <label>概要</label>
          <input
            v-model="inputDetail"
            type="textarea"
            class="mx-auto col-10 form-control"
            placeholder="Chatの概要(10~30字)"
          />
          <label>パスワード(任意)</label>
          <input
            v-model="inputPass"
            type="password"
            class="mx-auto col-10 form-control"
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

.bg-cover {
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 2;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal-form {
  height: 55%;
  width: 70%;
  background-color: white;
  position: fixed;
  top: 80px;
  left: 15%;
  z-index: 3;
}
</style>
