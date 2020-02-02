<template>
  <div class="ChatRoom">
    <!--部屋一覧と部屋作成ページ-->
    <header>
      <header-navi
        :path="path"
        :icon="icon"
        :title="title"
        :colorsetting="colorSetting"
      />
    </header>
    <div class="mx-auto jumbotron mt-4">
      <div v-if="status">
        <div class="d-flex flex-column jumbotron">
          <RoomForm :colorsetting="colorSetting" @makeRoom="makeRoom" />
          <RoomList
            :items="chatRoomList"
            :useruid="userData.uid"
            @moveRoom="moveRoom"
          />
        </div>
      </div>
      <div v-else>
        ログインしてください。
      </div>
    </div>
    <footer>
      <footer-navi :colorsetting="colorSetting" />
    </footer>
  </div>
</template>

<script>
import RoomForm from './parts/RoomForm';
import RoomList from './parts/RoomList';
import * as firebase from 'firebase/app';
import 'firebase/database';
import FireBase from '@/components/js/firebase.js';

let DB;

export default {
  name: 'ChatRoom',
  components: {
    RoomForm,
    RoomList
  },
  data() {
    return {
      chatRoomList: [],
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
    //認証
    FireBase.onAuth();
    //json(WebStrageの設定情報)の読み出し
    this.$store.commit('onSetUserSetting');
    //データベース問い合わせるためのオブジェクト
    DB = firebase.database();
    //部屋一覧を取得
    const GET_CHATROOMLIST = DB.ref('ChatRoom');
    if (this.userData) {
      GET_CHATROOMLIST.limitToLast(30).on('child_added', this.addList);
    } else {
      GET_CHATROOMLIST.limitToLast(30).off('child_added', this.addList);
    }
  },
  methods: {
    addList(snap) {
      //一件ずつ取り出して登録
      const CHATROOM_INFO = snap.val();
      this.chatRoomList.push({
        id: snap.key,
        roomname: CHATROOM_INFO.roomname,
        uid: CHATROOM_INFO.uid,
        user: CHATROOM_INFO.user,
        detail: CHATROOM_INFO.detail,
        roompass: CHATROOM_INFO.roompass
      });
    },
    makeRoom(InputRoomName, InputDetail, InputPass) {
      if (this.userData.uid) {
        if (InputPass.length === 0) {
          InputPass = 'NONE';
        }
        //ユニークキーの取得
        const ID = DB.ref('ChatRoom').push().key;
        //部屋情報の書き込み
        DB.ref('ChatRoom/' + ID).set({
          roomname: InputRoomName,
          uid: this.userData.uid,
          user: this.userData.displayName,
          detail: InputDetail,
          roompass: InputPass
        });
        //メッセージリストの書き込み(チャットをする場所)
        DB.ref('Chat/' + ID).set({
          roompass: InputPass,
          messagelist: {
            0: {
              name: '管理者',
              image: '',
              message: InputRoomName + 'にようこそ'
            }
          }
        });
      }
    },
    moveRoom(index) {
      //ユニークキーをURLパラメータに渡してチャットページに遷移
      const ROOM_ID = this.chatRoomList[index].id;
      this.$router.push(`/chatpage/${ROOM_ID}`);
    }
  }
};
</script>
