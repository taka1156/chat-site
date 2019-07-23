<template>
<div class="Chat">
    <h1>{{title}}</h1>
    <div v-if="pass!=null">
        <PassForm
         @doPassReset = "doPassReset"
         v-bind:pass="pass"
        ></PassForm>
    </div>

    <div v-else>
        <ChatBox
            v-bind:ChatLists="ChatList"
        ></ChatBox>

        <div class="input-group">
            <textarea
            class="form-control" 
            placeholder="書き込みたい内容を入れてください。" 
            v-model="InputChat"
            ></textarea>
            <div class="input-group-append">
                <button class="btn btn-success" type="button" @click="doSend()">Send</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ChatBox from '@/components/parts/chatbox'
import PassForm from '@/components/parts/passform';
import str from '@/components/js/store';
import * as firebase from 'firebase/app';
import 'firebase/database';

export default{
    components:{
        PassForm,
        ChatBox
    },
    data(){
        return{
            InputChat:null,
            ChatList:[],
            user:str.UserInfo,
            pass:str.PassWord,
            title:str.Title
        }
    },
    created() {
        const db_message = firebase.database().ref(`Chat/${str.RoomName}/messagelist`);
        if (this.user) {
            this.ChatList = [];
            // message に変更があったときのハンドラを登録
            db_message.limitToLast(10).on('child_added', this.addList);
        } else {
            // message に変更があったときのハンドラを解除
            db_message.limitToLast(10).off('child_added', this.addList);
        }
    },
     methods:{
        addList(snap) {
            const ChatInfo = snap.val();
            let flag;
            if(ChatInfo.name == this.user.displayName){
                 flag = true; 
            }else{
                flag = false;
            }
            this.ChatList.push({
                key: snap.key,
                Chatflag:flag,
                name: ChatInfo.name,
                image: ChatInfo.image,
                message: ChatInfo.message
            });
            this.scrollBottom();
        },
        doSend(){
            if (this.user.uid && this.InputChat.length) {
            // firebase にメッセージを追加
                firebase.database().ref(`Chat/${str.RoomName}/messagelist`).push({
                    name: this.user.displayName,
                    image: this.user.photoURL,
                    message:this.InputChat
                }, () => {
                    this.InputChat = null; // フォームを空にする
                });
            }
        },
        scrollBottom() {
            this.$nextTick(() => {
                window.scrollTo(0, document.body.clientHeight);
            })
        },
        doPassReset(){
            this.pass = null;
        }
    }
}
</script>

<style scoped>
.input-group{
    position: fixed;
    bottom: 0px;
    width: 100%;
}

textarea{
    font-size:16px;/*フォームの拡大防止*/
    height:35px;
    resize:none;
}
</style>