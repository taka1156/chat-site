<template>
  <div class="ChatRoom">
    <div v-if="user.uid">
      <div class="d-flex flex-column">
        <Formgroup @doMake="doMake" />
        <List
          class="jumbotron"
          :items="ChatRoomlist"
          :user="user.displayName"
          @doTalk="doTalk"
        />
      </div>
    </div>
    <div v-else>ログインしてください</div>
  </div>
</template>

<script>
import List from '@/components/parts/roomlist';
import Formgroup from '@/components/parts/formgroup';
import str from '@/components/js/store';
import * as firebase from 'firebase/app';
import 'firebase/database';

export default {
  name: 'ChatRoom',
  components: {
    Formgroup,
    List
  },
  data() {
    return {
      ChatRoomlist: [],
      user: str.UserInfo
    };
  },
  created() {
    const chatRoom = firebase.database().ref('ChatRoom');
    if (this.user) {
      chatRoom.limitToLast(30).on('child_added', this.addList);
    } else {
      chatRoom.limitToLast(30).off('child_added', this.addList);
    }
  },
  methods: {
    addList(snap) {
      const ChatInfo = snap.val();
      this.ChatRoomlist.push({
        key: snap.key,
        roomname: ChatInfo.roomname,
        user: ChatInfo.user,
        detail: ChatInfo.detail,
        roompass: ChatInfo.roompass
      });
    },
    doMake(InputTitle, InputDetail, InputPass) {
      if (this.user.uid && InputTitle.length && InputDetail.length) {
        const chatRoom = firebase.database();
        const id = chatRoom.ref('ChatRoom').push().key;

        chatRoom.ref('ChatRoom/' + id).set({
          roomname: InputTitle,
          user: this.user.displayName,
          detail: InputDetail,
          roompass: InputPass
        });

        chatRoom.ref('Chat/' + id).set({
          messagelist: {
            0: {
              name: '管理者',
              image: '',
              message: InputTitle + 'にようこそ'
            }
          }
        });
      }
    },
    doTalk(index) {
      str.RoomName = this.ChatRoomlist[index].key;
      str.PassWord = this.ChatRoomlist[index].roompass;
      str.Title = this.ChatRoomlist[index].roomname;
      this.$router.push('/chatpage');
    }
  }
};
</script>
