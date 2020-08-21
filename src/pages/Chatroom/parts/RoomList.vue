<template>
  <div class="ChatList">
    <!--チャット部屋一覧-->
    <div class="mx-auto">
      <div v-if="rooms.length === 0">
        部屋が登録されていません。
      </div>
      <div v-else>
        <div class="ml-0 col-1">
          <div @click="isPassAns = !isPassAns">
            <i v-if="isPassAns" class="material-icons">visibility</i>
            <i v-else class="material-icons">visibility_off</i>
          </div>
        </div>
        <div class="border" />
        <div class="list-group">
          <div v-for="(room, index) in rooms" :key="index">
            <article
              class="article-color mt-1 mx-auto text-left list-group-item flex-column align-items-start"
              @click="moveRoom(index)"
            >
              <div class="d-flex justify-content-start">
                <div v-if="room.pass !== 'NONE'">
                  <i class="material-icons">lock</i>
                </div>
                {{ room.roomName }}
              </div>
              スレ主:{{ room.userName }}
              <div
                v-if="userUid === room.uid && room.pass !== 'NONE' && isPassAns"
              >
                PASS[{{ room.pass }}]
              </div>
              <div v-else>{{ room.detail }}</div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatList',
  props: {
    userUid: {
      default: null,
      type: String
    },
    rooms: {
      type: Array,
      default: () => []
    },
    colorSetting: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      isPassAns: false,
      isAdded: true
    };
  },
  methods: {
    moveRoom(index) {
      this.$emit('move-room', index);
    }
  }
};
</script>
