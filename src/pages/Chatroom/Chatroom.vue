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
      <div class="d-flex flex-column jumbotron">
        <div v-if="displayStatus === ''">
          <RoomForm :color-setting="colorSetting" @make-room="makeRoom" />
          <RoomList
            :user-uid="user.uid"
            :rooms="rooms"
            :color-setting="colorSetting"
            @move-room="moveRoom"
          />
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </div>
        <div v-else>
          {{ displayStatus }}
        </div>
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
import auth from '@/plugins/firebase/auth.js';
import { getRooms, postRoom } from '@/plugins/firebase/db.js';

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
      icon: 'forum',
      timestamp: {
        seconds: 9999999999,
        nanoseconds: 999999999
      },
      isLoaded: false,
      rooms: []
    };
  },
  async created() {
    auth.onAuth();
    if (this.status) {
      this.init();
    }
  },
  watch:{
   status() {
      if (this.status && this.rooms.length === 0) {
        this.init();
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
    status() {
      return this.$store.getters['auth/status'];
    },
    displayStatus() {
      if (!this.status) {
        return 'ログインしてください。';
      } else {
        if (this.rooms.length === 0) {
          if (this.isLoaded) {
            return 'データがありません。';
          } else {
            return '読み込み中...';
          }
        } else {
          return '';
        }
      }
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
    // 初期化
    async init() {
      this.rooms = [];
      this.isLoaded = false;
      this.timestamp = {
        seconds: 9999999999,
        nanoseconds: 999999999
      };
      await this.next();
    },
    // 無限スクロール
    async infiniteHandler($state) {
      if (!this.isLoaded) {
        await this.next();
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    // ページング
    async next() {
      const { rooms, lastDate, isEnd } = await getRooms(this.timestamp);
      if (isEnd) {
        this.isLoaded = true;
      } else {
        this.rooms.push(...rooms);
        this.timestamp = lastDate;
      }
    },
    // 部屋作成
    async makeRoom({ roomName, detail, pass }) {
      // ユーザー情報追加
      const roomInfo = {
        roomName: roomName,
        detail: detail,
        pass: pass,
        uid: this.user.uid,
        userName: this.user.displayName
      };
      // 部屋情報を投稿
      await postRoom(roomInfo);
      // 初期化
      await this.init();
    },
    moveRoom(index) {
      //ユニークキーをURLパラメータに渡してチャットページに遷移
      const ROOM_ID = this.rooms[index].roomUid;
      this.$router.push(`/chatpage/${ROOM_ID}`);
    }
  }
};
</script>
