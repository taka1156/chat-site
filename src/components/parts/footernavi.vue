<template>
  <div class="FooterNavi">
    <ul class="bg-success nav nav-fill fixed-bottom mb-0">
      <li class="nav-item mx-auto col-3 border">
        <router-link to="/" class="nav-link d-flex flex-column">
          Help
          <i class="material-icons">help</i>
        </router-link>
      </li>
      <li class="nav-item mx-auto col-3 border">
        <router-link to="/account" class="nav-link d-flex flex-column">
          Account
          <i class="material-icons">account_box</i>
        </router-link>
      </li>
      <li class="nav-item mx-auto col-3 border">
        <router-link to="/chatroom" class="nav-link d-flex flex-column">
          ChatRoom
          <i class="material-icons">forum</i>
        </router-link>
      </li>
      <li class="nav-item mx-auto col-3 border">
        <router-link to="/Setting" class="nav-link d-flex flex-column">
          Setting
          <i class="material-icons">settings_applications</i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style>
a,
a:hover {
  display: block;
  color: white;
  text-decoration: none;
}

.border {
  border-color: rgba(0, 0, 0, 0.2);
}
</style>
