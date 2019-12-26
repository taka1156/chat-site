<template>
  <div class="ChatList">
    <!--チャット部屋一覧-->
    <div class="mx-auto">
      <div class="ml-0 col-1">
        <div @click="isPassAns = !isPassAns">
          <i v-if="isPassAns" class="material-icons">visibility</i>
          <i v-else class="material-icons">visibility_off</i>
        </div>
      </div>
      <div class="border" />
      <div class="list-group">
        <div v-for="(item, index) in SliceItems" :key="index">
          <article
            class="article-color mt-2 mx-auto text-left list-group-item flex-column align-items-start"
            @click="moveRoom(index)"
          >
            <div class="d-flex justify-content-start">
              <div v-if="item.roompass !== 'NONE'">
                <i class="material-icons">lock</i>
              </div>
              {{ item.roomname }}
            </div>
            スレ主:{{ item.user }}
            <div
              v-if="
                useruid === item.uid && item.roompass !== 'NONE' && isPassAns
              "
            >
              PASS[{{ item.roompass }}]
            </div>
            <div v-else>{{ item.detail }}</div>
          </article>
        </div>
      </div>
      <div class="mx-auto col-3 d-flex justify-content-center">
        <p class="h4" @click="prevPage()">&lt;</p>
        {{ page }}/{{ MaxPage }}
        <p class="h4" @click="nextPage()">&gt;</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatList',
  props: {
    items: {
      default: null,
      type: Array
    },
    useruid: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      isPassAns: false,
      page: 1,
      perPage: 10
    };
  },
  computed: {
    SliceItems() {
      if (this.items == null) return;
      return this.items.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
    MaxPage() {
      return Math.ceil(this.items.length / this.perPage); //総ページ数
    }
  },
  watch: {
    items: function() {
      this.page = 1;
    }
  },
  methods: {
    moveRoom(index) {
      const INDEX = (this.page - 1) * this.perPage + index;
      this.$emit('moveRoom', INDEX);
    },
    prevPage() {
      this.page = Math.max(this.page - 1, 1);
    },
    nextPage() {
      this.page = Math.min(this.page + 1, this.MaxPage);
    }
  }
};
</script>
