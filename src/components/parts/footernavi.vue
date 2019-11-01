<template>
  <div class="Navi">
    <ul class="bg-success nav nav-fill fixed-bottom mb-0">
      <li class="nav-item col-3">
        <router-link to="/" class="nav-link d-flex flex-column">
          Help
          <i class="material-icons mx-auto">help</i>
        </router-link>
      </li>
      <li class="nav-item col-3">
        <router-link to="/account" class="nav-link d-flex flex-column">
          Account
          <i class="material-icons mx-auto">account_box</i>
        </router-link>
      </li>
      <li class="nav-item col-3">
        <router-link to="/chatroom" class="nav-link d-flex flex-column">
          ChatRoom
          <i class="material-icons mx-auto">forum</i>
        </router-link>
      </li>
      <li class="nav-item col-3">
        <router-link to="/Setting" class="nav-link d-flex flex-column">
          Setting
          <i class="material-icons mx-auto">settings_applications</i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navi',
  data() {
    return {
      bottomNav: 'help'
    };
  }
};
</script>

<style>
a,
v-icon {
  color: whitesmoke;
  text-decoration: none;
}

a:hover,
v-icon:hover {
  color: gray;
  text-decoration: none;
}
</style>
