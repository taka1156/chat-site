<template>
<div class = "Chatroom">
  <div v-if="this.user.uid">
    <div class="d-flex flex-column" >
        <Formgroup
          @doMake = "doMake"
        >
        </Formgroup>

        <List
          v-bind:items="ChatRoomlist"
          v-bind:user="user.displayName"
          @doTalk = "doTalk"
          class = "jumbotron"
        >
        </List>
    </div>
  </div>
  <div v-else>ログインしてください</div>
  </div>
</div>
</template>

<script>
import List from '@/components/parts/list'
import Formgroup　from '@/components/parts/formgroup';
import Account from '@/components/pages/Account';
import str from '@/components/js/store';
import * as firebase from 'firebase/app';
import 'firebase/database';

export default {
  components:{
    Formgroup,
    List
  },
  data(){
    return {
      ChatRoomlist:[],
      user:str.UserInfo
    }
  },
  created(){
    const db_ChatRoom = firebase.database().ref('ChatRoom');
    if (this.user) {
        db_ChatRoom.limitToLast(30).on('child_added', this.addList);
    } else {
        db_ChatRoom.limitToLast(30).off('child_added', this.addList);
    }
  },
  methods:{
    addList(snap) {
      const ChatInfo = snap.val();
      this.ChatRoomlist.push({
        key:snap.key,
        roomname:ChatInfo.roomname,
        user:ChatInfo.user,
        detail:ChatInfo.detail,
        roompass:ChatInfo.roompass
      });
    },
    doMake(InputTitle,InputDetail,InputPass){
      if(this.user.uid && InputTitle.length && InputDetail.length){
        firebase.database().ref('ChatRoom').push({
          roomname:InputTitle,
          user:this.user.displayName,
          detail:InputDetail,
          roompass:InputPass,
          messagelist:{
              0:{
              name: '管理者',
              image: '',
              message:InputTitle + 'にようこそ'
            }
          }
        });
      }
    },
    doTalk(index){
      str.RoomName = this.ChatRoomlist[index].key;
      str.PassWord = this.ChatRoomlist[index].roompass;
      str.Title = this.ChatRoomlist[index].roomname;
      this.$router.push('/chatpage');
    },
  }
}
</script>