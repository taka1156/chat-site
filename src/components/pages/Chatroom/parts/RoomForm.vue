<template>
  <div class="formgroup">
    <!--button-->
    <button
      type="button"
      class="btn col-7"
      :style="{ 'background-color': colorsetting }"
      @click="init()"
    >
      チャット部屋を作る
    </button>
    <!--modal-->
    <div v-show="isModal">
      <div class="modal-form">
        <div class="mx-auto col-11">
          <div class="modal-header">
            <h5 class="modal-title">
              部屋作成
            </h5>
          </div>
          <div class="modal-body">
            <label>部屋名</label>
            <input
              v-model="inputRoomName"
              type="text"
              class="form-control"
              placeholder="Chatの部屋名"
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
          <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>
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
              type="button"
              class="btn col-6"
              :style="{ 'background-color': colorsetting }"
              @click="makeRoom()"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    colorsetting: null
  },
  data() {
    return {
      isModal: false,
      inputRoomName: '',
      inputDetail: '',
      inputPass: ''
    };
  },
  computed: {
    errorMsg() {
      if (!this.inputRoomName.length || !this.inputDetail.length) {
        return '部屋名と概要は必ず埋めてください';
      } else if (this.inputRoomName.length > 15) {
        return '部屋名は15字以内にしてください';
      } else if (this.inputDetail.length > 30) {
        return '概要は30字以内にしてください';
      } else if (this.inputPass === 'NONE') {
        return 'パスワードにNONEは指定できません';
      } else {
        return null;
      }
    }
  },
  methods: {
    makeRoom() {
      if (this.errorMsg !== null) {
        return;
      }
      this.isModal = !this.isModal;
      this.$emit(
        'makeRoom',
        this.inputRoomName,
        this.inputDetail,
        this.inputPass
      );
    },
    init() {
      this.inputRoomName = this.inputDetail = this.inputPass = '';
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
