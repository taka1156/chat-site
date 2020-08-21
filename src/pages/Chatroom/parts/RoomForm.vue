<template>
  <div class="RoomForm">
    <!--部屋作成のフォーム-->
    <button
      class="btn col-7"
      :style="{ 'background-color': colorSetting }"
      @click="init()"
    >
      チャット部屋を作る
    </button>

    <div v-show="isModal">
      <div class="modal-form">
        <fieldset class="mx-auto col-11">
          <div class="modal-header">
            <legend class="modal-title">部屋作成</legend>
          </div>
          <form @submit.prevent>
            <div class="modal-body">
              <label for="roomName">部屋名</label>
              <input
                id="roomName"
                v-model="roomName"
                type="text"
                class="form-control"
                placeholder="Chatの部屋名"
                minlength="4"
                maxlength="10"
                required
              />
              <label for="roomDetail">概要</label>
              <input
                id="roomDetail"
                v-model="detail"
                type="text"
                class="form-control"
                placeholder="Chatの概要(10~30字)"
                minlength="10"
                maxlength="30"
                required
              />
              <label for="roomPass">パスワード(任意)</label>
              <input
                id="roomPass"
                v-model="pass"
                type="password"
                class="form-control"
                placeholder="Chatのパスワード(任意)"
                autocomplete
              />
              <div v-if="errorMsg" class="mt-3 alert alert-danger">
                {{ errorMsg }}
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
                @click="makeRoom()"
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
  name: 'RoomForm',
  props: {
    colorSetting: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      isModal: false,
      roomName: '',
      detail: '',
      pass: ''
    };
  },
  computed: {
    errorMsg() {
      if (!this.roomName.length || !this.detail.length) {
        return '部屋名と概要は必ず埋めてください';
      } else if (this.roomName.length < 4) {
        return '部屋名は4字以上10字以下にしてください';
      } else if (this.detail.length < 10) {
        return '概要は10字以上20字以下にしてください';
      } else if (this.pass === 'NONE') {
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
      // パスワードがなければ初期値で埋める(入力はなし)
      if (this.pass.length === 0) {
        this.pass = 'NONE';
      }
     // 部屋情報
      const ROOM_INFO = {
        roomName: this.roomName,
        detail: this.detail,
        pass: this.pass
      };
      this.$emit('make-room', ROOM_INFO);
    },
    init() {
      this.roomName = this.detail = this.pass = '';
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
