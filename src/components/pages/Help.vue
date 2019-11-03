<template>
  <div class="Top">
    <header-navi :path="path" :icon="icon" :title="title" />
    <div class="mx-auto jumbotron mt-3">
      <h1 class="h2">ようこそ Chat アプリへ</h1>
      <img class="mx-auto col-sm-8 col-md-4" src="@/assets/undraw_chat.svg" />
      <p>
        このウェブページはFireBaseとVue.jsを利用して作られたチャットページです。
      </p>
      <p>好きなことを書いてください。</p>
      <h2>&lt;主な機能&gt;</h2>
      <div class="mx-auto mb-4">
        <h3 class="mx-auto col-10">
          HELP
          <i class="material-icons">help</i>
        </h3>
        <p>使い方の説明のページです。</p>
      </div>
      <div class="mx-auto mb-4">
        <h3 class="mx-auto col-10">
          ACCOUNT
          <i class="material-icons">account_box</i>
        </h3>
        <p>ログインを管理しています。</p>
        <p>ログインはTwitterのアカウントを使用しています</p>
      </div>
      <div class="mx-auto mb-4">
        <h3 class="mx-auto col-10">
          CHATROOM
          <i class="material-icons">chat</i>
        </h3>
        <p>チャット部屋の作成及び、一覧を見ることができます。</p>
        <p class="text-body text-break">
          チャット部屋には、任意でパスワードの設定を行うことができ、
          <i class="material-icons small">visibility</i>や
          <i class="material-icons small">visibility_off</i>
          は、スレ主がクリックすることで、パスワードの表示/非表示をすることができます。
        </p>
      </div>
      <p class="h3">さぁチャットを始めましょう</p>
      <img
        class="mx-auto col-sm-8 col-md-4"
        src="@/assets/undraw_beginchat.svg"
      />
    </div>
    <footer-navi />
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: null,
      title: 'Help',
      icon: 'help'
    };
  }
};
</script>

<style scoped>
a {
  color: blue;
}

.jumbotron {
  background-color: rgba(0, 0, 0, 0);
  width: 80%;
}
</style>
