<template>
  <div class="navi">
    <v-tabs
    centered
    color="gray"
    dark
    icons-and-text
    grow
  >
    <v-tabs-slider color="yellow"></v-tabs-slider>

    <v-tab router-link to="/">
      Top
      <v-icon>home</v-icon>
    </v-tab>

    <v-tab router-link to="/account">
      Account
      <v-icon>account_box</v-icon>
    </v-tab>

    <v-tab router-link to="/chatroom">
      ChatRoom
      <v-icon>chat</v-icon>
    </v-tab>

  </v-tabs>
  </div>
</template>

<script>
</script>

<style>
a ,a:hover{
  color: white;
  text-decoration: none;
}
</style>