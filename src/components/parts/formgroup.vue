<template>
  <div class="formgroup">
    <button type="button" class="mx-auto col-3 btn btn-success" @click="init()">
      チャット部屋を作る
    </button>

    <div v-show="isForm" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              テーブル作成
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="閉じる"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label>タイトル</label>
            <input
              v-model="InputTitle"
              type="text"
              class="mx-auto col-10 form-control"
              placeholder="Chatのタイトル"
            />
            <label>概要</label>
            <input
              v-model="InputDetail"
              type="text"
              class="mx-auto col-10 form-control"
              placeholder="Chatの概要(10~30字)"
            />
            <label>パスワード(任意)</label>
            <input
              v-model="InputPass"
              type="password"
              class="mx-auto col-10 form-control"
              placeholder="Chatのパスワード(任意)"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="isForm = !isForm"
            >
              閉じる
            </button>
            <button type="button" class="btn btn-primary" @click="doMake()">
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
  data() {
    return {
      isForm: false,
      InputTitle: null,
      InputDetail: null,
      InputPass: null
    };
  },
  methods: {
    doMake() {
      this.isForm = !this.isForm;
      this.$emit('doMake', this.InputTitle, this.InputDetail, this.InputPass);
    },
    init() {
      this.InputTitle = this.InputDetail = this.InputPass = null;
      this.isForm = !this.isForm;
    }
  }
};
</script>

<style scoped>
.form-control {
  font-size: 16px; /*フォームの拡大防止*/
}
</style>
