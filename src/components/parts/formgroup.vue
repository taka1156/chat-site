<template>
<div class = "formgroup">
    <button type="button" class="m-2 mx-auto col-6 btn btn-success" v-on="on" @click="isForm=!isForm">チャット部屋を作る</button>

　      <v-layout row justify-center>
        <v-dialog v-model="isForm" persistent max-width="600px" >
            <v-card>
                <v-card-title><span class="headline">テーブル作成</span></v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <label>タイトル</label>
                        <input type="text" class="mx-auto col-10 form-control" placeholder="Chatのタイトル" v-model="InputTitle">
                        <label>概要</label>
                        <input type="text" class="mx-auto col-10 form-control" placeholder="Chatの概要(10~30字)" v-model="InputDetail">
                        <label>パスワード(任意)</label>
                        <input type="password" class="mx-auto col-10 form-control" placeholder="Chatのパスワード(任意)" v-model="InputPass">
                    </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="isForm = false">閉じる</v-btn>
                <v-btn color="blue darken-1" flat @click="isForm = false;doMake()">決定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</div>
</template>

<script>
export default {
    data(){
        return {
            isForm:false,
            InputTitle:null,
            InputDetail:null,
            InputPass:null
        }
    },
    methods:{
        doMake(){
            this.$emit('doMake',this.InputTitle,this.InputDetail,this.InputPass);
            this.isForm=!this.isForm;
            this.InputTitle=this.InputDetail=null;
        }
    }
}
</script>

<style scoped>
.form-control{
    font-size:16px;/*フォームの拡大防止*/
}
</style>