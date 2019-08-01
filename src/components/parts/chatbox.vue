<template>
<div class="Chatbox">
  <div v-if="ChatLists!=null">
    <div v-for="ChatObj in ChatLists" :key="ChatObj.key">
      <!--MyChat-->
      <div class="d-flex flex-column">
        <div class="my-cahat" v-if="ChatObj.Chatflag == true">
          <div class="balloon1-right">
            <Nl2br tag="p" :text="ChatObj.message"></Nl2br>
            <div class="border"></div>
              発言者:{{ChatObj.name}}
          </div>
          <img :src="ChatObj.image" class="icon">

        </div>
      </div>

      <!--OtherChat-->
      <div class="d-flex flex-column">
        <div class="other-cahat" v-if="ChatObj.Chatflag == false">
          <img :src="ChatObj.image" class="icon">
          <div class="balloon1-left">
            <Nl2br tag="p" :text="ChatObj.message"></Nl2br>
            <div class="border"></div>
            発言者:{{ChatObj.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Nl2br from 'vue-nl2br'

  export default {
    components:{
      Nl2br
    },
    props:{
      ChatLists:null,
    },
  }
</script>

<style scoped>
.icon{
  height:50px;
  width:50px;
  border-radius:50px;
  border:solid 0.5px gray;
}
.my-cahat{
  text-align: right;
}

.other-cahat{
  text-align: left;
}

/*吹き出し(右)*/
.balloon1-right {
  position: relative;
  display: inline-block;
  margin: 1.5em 15px 2.5em 0;
  padding: 7px 10px;
  min-width: 120px;
  max-width: 80%;
  color: #555;
  font-size: 16px;
  background: #e0edff;
}

.balloon1-right:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -15px;
  border: 15px solid transparent;
  border-left: 15px solid #e0edff;
}

.balloon1-right p {
  margin: 0;
  padding: 0;
  text-align: left;
  word-wrap: break-word;
}

/*********/
/*********/

/*吹きだし(左)*/
.balloon1-left {
  position: relative;
  display: inline-block;
  margin: 1.5em 0 2.5em 15px;
  padding: 7px 10px;
  min-width: 120px;
  max-width: 80%;
  color: #555;
  font-size: 16px;
  background: #e0edff;
}

.balloon1-left:before {
  content: "";
  position: absolute;
  top: 50%;
  left: -30px;
  margin-top: -15px;
  border: 15px solid transparent;
  border-right: 15px solid #e0edff;
}

.balloon1-left p {
  margin: 0;
  padding: 0;
  text-align: left;
  word-wrap: break-word;
}
</style>