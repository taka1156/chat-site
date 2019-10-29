<template>
  <div class="ChatRoom">
    <div v-if="status">
      <div class="d-flex flex-column">
        <Formgroup @doMake="doMake" />
        <List
          class="jumbotron"
          :items="ChatRoomList"
          :user="userData.displayName"
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
import firebase from 'firebase/app';
import 'firebase/database';

export default {
  name: 'ChatRoom',
  components: {
    Formgroup,
    List
  },
  data() {
    return {
      ChatRoomList: []
    };
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
    status() {
      return this.$store.getters.status;
    }
  },
  created() {
    const chatRoom = firebase.database().ref('ChatRoom');
    if (this.userData) {
      chatRoom.limitToLast(30).on('child_added', this.addList);
    } else {
      chatRoom.limitToLast(30).off('child_added', this.addList);
    }
  },
  methods: {
    addList(snap) {
      const ChatInfo = snap.val();
      this.ChatRoomList.push({
        key: snap.key,
        roomname: ChatInfo.roomname,
        user: ChatInfo.user,
        detail: ChatInfo.detail,
        roompass: ChatInfo.roompass
      });
    },
    doMake(InputTitle, InputDetail, InputPass) {
      if (this.userData.uid && InputTitle.length && InputDetail.length) {
        const chatRoom = firebase.database();
        const id = chatRoom.ref('ChatRoom').push().key;
        chatRoom.ref('ChatRoom/' + id).set({
          roomname: InputTitle,
          user: this.userData.displayName,
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
      const roomInfo = {
        name: this.ChatRoomList[index].roomname,
        path: this.ChatRoomList[index].key,
        pass: this.ChatRoomList[index].roompass
      };
      this.$store.commit('setRoomInfo', roomInfo);
      this.$router.push('/chatpage');
    }
  }
};
</script>
