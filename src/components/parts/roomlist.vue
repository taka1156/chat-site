<template>
<div class="list">
    <v-card class="mx-auto">
        <div class = "d-flex flex-row col-1">
            <div @click="isPassAns=!isPassAns">
                <v-icon v-if="isPassAns">visibility</v-icon>
                <v-icon v-else>visibility_off</v-icon>
            </div>
        </div>
        <v-divider></v-divider>
        <v-list two-line>
            <template v-for="(item, index) in SliceItems">
                <v-list-tile
                :key="item.RoomName"
                ripple
                @click="doTalk(index)"
                >
                <v-list-tile-content>
                    <v-list-tile-title>
                        <div v-if="item.roompass"><v-icon>lock</v-icon>{{ item.roomname }}</div>
                        <div v-else>{{ item.roomname }}</div>
                    </v-list-tile-title>
                    <v-list-tile-sub-title class="text--primary">スレ主:{{ item.user }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>
                        <div v-if="user==item.user && item.roompass && isPassAns">PASS[{{item.roompass}}]</div>
                        <div v-else>{{ item.detail }}</div>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                </v-list-tile>

                <v-divider
                v-if="index + 1 < SliceItems.length"
                :key="index"
                ></v-divider>
            </template>
        </v-list>
        <button type="button" class="btn " @click="prevPage()"><</button>
        {{ page }}/{{ MaxPage }}
        <button type="button" class="btn " @click="nextPage()">></button>
    </v-card>
</div>
</template>

<script>
export default {
    props:{
        items:Array,
        user:null,
    },
    data(){
        return {
            isPassAns:false,
            page:1,
            perPage:4
        }
    },
    watch:{
        items:function(){
            this.page = 1;
        }
    },
    computed:{
    SliceItems(){
      if(this.items == null)return;
      return this.items.slice((this.page - 1) * this.perPage, this.page * this.perPage);
    },
    MaxPage(){
      return Math.ceil(this.items.length/this.perPage);//総ページ数
    }
  },
    methods:{
        doTalk(index){
            const calIndex = (this.page-1)*this.perPage +  index;
            this.$emit('doTalk',calIndex);
        },
        prevPage(){
            this.page = Math.max(this.page- 1, 1);
        },
        nextPage(){
            this.page = Math.min(this.page+ 1, this.MaxPage);
        },
    }
}
</script>