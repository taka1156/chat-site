<template>
  <div class="formgroup">
    <button
      type="button"
      class="m-2 mx-auto col-6 btn btn-success"
      @click="init()"
    >
      チャット部屋を作る
    </button>

    <v-layout row justify-center>
      <v-dialog v-model="isForm" persistent max-width="600px">
        <v-card>
          <v-card-title
            ><span class="headline">テーブル作成</span></v-card-title
          >
          <v-card-text>
            <v-container grid-list-md>
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
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="isForm = !isForm"
              >閉じる</v-btn
            >
            <v-btn color="blue darken-1" flat @click="doMake()">決定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
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
