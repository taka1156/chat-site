<template>
  <div class="ChatRoom">
    <header-navi :path="path" :icon="icon" :title="title" />
    <div class="mx-auto jumbotron mt-3">
      <div v-if="status">
        <div class="d-flex flex-column jumbotron">
          <Formgroup @doMake="doMake" />
          <List
            :items="ChatRoomList"
            :user="userData.displayName"
            @doTalk="doTalk"
          />
        </div>
      </div>
    </div>
    <footer-navi />
  </div>
</template>

<script>
import List from '@/components/parts/RoomList';
import Formgroup from '@/components/parts/RoomForm';
import roomstore from '@/components/js/store.js';
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
      ChatRoomList: [],
      path: '/account',
      title: 'ChatRoom',
      icon: 'forum'
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
    this.$store.commit('onSetUserSetting');
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
      roomstore.roomInfo = {
        name: this.ChatRoomList[index].roomname,
        path: this.ChatRoomList[index].key,
        pass: this.ChatRoomList[index].roompass
      };
      this.$router.push('/chatpage');
    }
  }
};
</script>
