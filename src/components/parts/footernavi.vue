<template>
  <div class="FooterNavi">
    <ul class="bg-success nav nav-fill fixed-bottom mb-0">
      <li class="nav-item col-3 border">
        <router-link to="/" class="nav-link d-flex flex-column">
          <div class="mx-auto">
            <i class="material-icons">help</i>
            <p class="small">Help</p>
          </div>
        </router-link>
      </li>
      <li class="nav-item col-3 border">
        <router-link to="/account" class="nav-link d-flex flex-column">
          <div class="mx-auto">
            <i class="material-icons">account_box</i>
            <p class="small">Account</p>
          </div>
        </router-link>
      </li>
      <li class="nav-item col-3 border">
        <router-link to="/chatroom" class="nav-link mx-auto d-flex flex-column">
          <div class="mx-auto">
            <i class="material-icons">forum</i>
            <p class="small">Chat</p>
          </div>
        </router-link>
      </li>
      <li class="nav-item col-3 border">
        <router-link to="/Setting" class="nav-link d-flex flex-column">
          <div class="mx-auto">
            <i class="material-icons">settings_applications</i>
            <p class="small">Setting</p>
          </div>
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

.material-icons {
  font-size: 25px;
}
</style>
