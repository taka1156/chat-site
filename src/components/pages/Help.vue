<template>
<div class="Top">
  <h1>ようこそ Chat アプリへ</h1>
    <div class="d-flex flex-column">
      <img class="mx-auto col-sm-8 col-md-4" src="@/assets/undraw_chat.svg">
      <p class="text-body text-break">
        このウェブページはFireBaseとVue.jsを利用して作られたチャットページです。
        好きなことを書いてください。
      </p>
      <h1>&lt;主な機能&gt;</h1>
      <div class="mx-auto jumbotron">
        <h1 class="mx-auto col-11">HELP</h1>
        <v-icon size="50">help</v-icon>

        <p class="text-body text-break">
          使い方の説明のページです。<br>
          もしわからなければ、<a href = "https://twitter.com/taka56110">こちら</a>までお願いします。
        </p>

        <h1 class="mx-auto col-10">ACCOUNT</h1>
        <v-icon size="50">account_box</v-icon>

        <p class="text-body text-break">
          ログインを管理しています。<br>
          ログインはTwitterのアカウントを使用しています
        </p>

        <h1 class="mx-auto col-10">CHATROOM</h1>
        <v-icon size="50">chat</v-icon>
        
        <p class="text-body text-break ">
          チャット部屋の作成及び、一覧を見ることができます。
          チャット部屋には、任意でパスワードの設定を行うことができ、
          <v-icon small>visibility</v-icon>や<v-icon small>visibility_off</v-icon>は、スレ主がクリックすることで、パスワードの表示/非表示をすることができます。<br>
        </p>
      </div>
      <h2>さぁチャットを始めましょう</h2>
      <img class="mx-auto col-sm-8 col-md-4" src="@/assets/undraw_beginchat.svg">
    </div>
</div>
</template>

<style scoped>
a{
    color:blue;
}

.jumbotron{
  background-color:rgba(0,0,0,0.0);
  width:80%
}
</style>