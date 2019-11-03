<template>
  <div class="FooterNavi">
    <div class="bg-success d-flex justify-content-between fixed-bottom mb-0">
      <router-link
        to="/"
        class="navi-items col-3 border border-secondary"
        exact
      >
        <div class="d-flex flex-column">
          <i class="material-icons">help</i>
          Help
        </div>
      </router-link>
      <router-link
        to="/account"
        class="navi-items col-3 border border-secondary"
        exact
      >
        <div class="d-flex flex-column">
          <i class="material-icons">account_box</i>
          Account
        </div>
      </router-link>
      <router-link
        to="/chatroom"
        class="navi-items col-3 border border-secondary"
        exact
      >
        <div class="d-flex flex-column">
          <i class="material-icons">forum</i>
          Chat
        </div>
      </router-link>
      <router-link
        to="/setting"
        class="navi-items col-3  border border-secondary"
        exact
      >
        <div class="d-flex flex-column">
          <i class="material-icons">settings_applications</i>
          Setting
        </div>
      </router-link>
    </div>
  </div>
</template>

<style>
a,
a:hover {
  display: block;
  color: white;
  text-decoration: none;
}

.router-link-active,
.router-link-active:hover {
  color: black;
  text-decoration: none;
}

.border {
  border-color: rgba(0, 0, 0, 0.2);
}

.material-icons {
  font-size: 25px;
}
</style>
