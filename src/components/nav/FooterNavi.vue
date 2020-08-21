<template>
  <div class="FooterNavi">
    <nav
      class=" d-flex justify-content-between fixed-bottom mb-0"
      :style="{ 'background-color': colorSetting }"
    >
      <router-link to="/" class="col-3 border border-secondary">
        <div class="d-flex flex-column">
          <i class="material-icons">help</i>
          Help
        </div>
      </router-link>
      <router-link to="/account" class="col-3 border border-secondary">
        <div class="d-flex flex-column">
          <i class="material-icons">account_box</i>
          Account
        </div>
      </router-link>
      <router-link to="/chatroom" class="col-3 border border-secondary">
        <div class="d-flex flex-column">
          <i class="material-icons">forum</i>
          Chat
        </div>
      </router-link>
      <router-link to="/setting" class="col-3  border border-secondary">
        <div class="d-flex flex-column">
          <i class="material-icons">settings_applications</i>
          Setting
        </div>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    colorSetting: {
      default: null,
      type: String
    }
  }
};
</script>

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
