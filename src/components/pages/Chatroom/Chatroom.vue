<template>
  <div class="ChatRoom">
    <!--部屋一覧と部屋作成ページ-->
    <header>
      <header-navi
        :path="path"
        :icon="icon"
        :title="title"
        :color-setting="colorSetting"
      />
    </header>
    <div class="mx-auto jumbotron mt-4">
      <div v-if="status">
        <div class="d-flex flex-column jumbotron">
          <RoomForm :color-setting="colorSetting" @make-room="makeRoom" />
          <RoomList
            :items="chatRoomList"
            :user-uid="user.uid"
            @moveRoom="moveRoom"
          />
        </div>
      </div>
      <div v-else>
        ログインしてください。
      </div>
    </div>
    <footer>
      <footer-navi :color-setting="colorSetting" />
    </footer>
  </div>
</template>

<script>
import RoomForm from './parts/RoomForm';
import RoomList from './parts/RoomList';
import auth from '@/components/FireBase/auth.js';
import db from '@/components/FireBase/db.js';

export default {
  name: 'ChatRoom',
  components: {
    RoomForm,
    RoomList
  },
  data() {
    return {
      path: '/account',
      title: 'ChatRoom',
      icon: 'forum'
    };
  },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
    status() {
      return this.$store.getters['auth/status'];
    },
    colorSetting() {
      const COLOR = this.$store.getters['setting/colorSetting'];
      if (COLOR === null) {
        return 'forestgreen';
      }
      return COLOR;
    }
  },
  methods: {
    makeRoom(roomInfo) {
      if (roomInfo.pass.length === 0) {
        roomInfo.pass = 'NONE';
      }
      // 部屋情報をpost
      db.postRoom(roomInfo);
    },
    moveRoom(index) {
      //ユニークキーをURLパラメータに渡してチャットページに遷移
      const ROOM_ID = this.chatRoomList[index].id;
      this.$router.push(`/chatpage/${ROOM_ID}`);
    }
  }
};
</script>
