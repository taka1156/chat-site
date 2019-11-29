<template>
  <div class="ChatRoom">
    <header-navi :path="path" :icon="icon" :title="title" />
    <div class="mx-auto jumbotron mt-4">
      <div v-if="status">
        <div class="d-flex flex-column jumbotron">
          <RoomForm :colorsetting="colorSetting" @makeRoom="makeRoom" />
          <List
            :items="ChatRoomList"
            :user="userData.displayName"
            @moveRoom="moveRoom"
          />
        </div>
      </div>
    </div>
    <footer-navi />
  </div>
</template>

<script>
import List from './parts/RoomList';
import RoomForm from './parts/RoomForm';
import * as firebase from 'firebase/app';
import 'firebase/database';
import FireBase from '@/components/js/firebase.js';

export default {
  name: 'ChatRoom',
  components: {
    RoomForm,
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
    },
    colorSetting() {
      const COLOR = this.$store.getters.colorSetting;
      if (COLOR === null) {
        return 'forestgreen';
      }
      return COLOR;
    }
  },
  created() {
    const chatRoom = firebase.database().ref('ChatRoom');
    FireBase.onAuth();
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
        slug: snap.key,
        roomname: ChatInfo.roomname,
        user: ChatInfo.user,
        detail: ChatInfo.detail,
        roompass: ChatInfo.roompass
      });
    },
    makeRoom(InputTitle, InputDetail, InputPass) {
      if (this.userData.uid) {
        if (InputPass.length === 0) {
          InputPass = 'NONE';
        }
        const chatRoom = firebase.database();
        const id = chatRoom.ref('ChatRoom').push().key;
        chatRoom.ref('ChatRoom/' + id).set({
          roomname: InputTitle,
          user: this.userData.displayName,
          detail: InputDetail,
          roompass: InputPass
        });
        chatRoom.ref('Chat/' + id).set({
          roompass: InputPass,
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
    moveRoom(index) {
      const ROOM_SLUG = this.ChatRoomList[index].slug;
      this.$router.push(`/chatpage/${ROOM_SLUG}`);
    }
  }
};
</script>
