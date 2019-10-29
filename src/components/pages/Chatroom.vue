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
//Chat.vueのFireBase処理を分離し終えたら消す↓
import str from '@/components/js/store';
import FireBase from '@/components/js/firebase.js';

export default {
  name: 'ChatRoom',
  components: {
    Formgroup,
    List
  },
  computed: {
    userData() {
      return this.$store.Auth.getters.userData;
    },
    status() {
      return this.$store.Auth.getters.status;
    },
    ChatRoomList() {
      return this.$store.ChatRoom.getters.ChatRoomList;
    }
  },
  created() {
    this.$store.ChatRoom.commit('resetList');
    FireBase.initDB(this.status);
  },
  methods: {
    doMake(InputTitle, InputDetail, InputPass) {
      if (this.userData.uid && InputTitle.length && InputDetail.length) {
        const roomInfo = {
          roomname: InputTitle,
          user: this.userData.displayName,
          detail: InputDetail,
          roompass: InputPass
        };
        FireBase.doMake(roomInfo);
      }
    },
    doTalk(index) {
      str.RoomName = this.ChatRoomList[index].key;
      str.PassWord = this.ChatRoomList[index].roompass;
      str.Title = this.ChatRoomList[index].roomname;
      this.$router.push('/chatpage');
    }
  }
};
</script>
