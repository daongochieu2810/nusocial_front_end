<template>
  <b-navbar class="nav-bar shadow">
    <b-navbar-brand to="/" class="brand">NUSocial Admin</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-item href="#">
        <b-dropdown size="sm" dropleft variant="link" toggle-class="text-decoration-none" no-caret>
          <template v-slot:button-content>
            <img class="notification" src="../assets/bell-53.svg" />
          </template>
          <b-dropdown-item>
            <router-link to="/community">Some news in community</router-link>
          </b-dropdown-item>
          <b-dropdown-item>Some other general news</b-dropdown-item>
          <b-dropdown-item>Random news</b-dropdown-item>
        </b-dropdown>
      </b-nav-item>
      <b-nav-item href="#">
        <b-dropdown size="sm" dropleft variant="link" toggle-class="text-decoration-none" no-caret>
          <template v-slot:button-content>
            <img class="user" src="../assets/face.svg" />
          </template>
          <b-dropdown-item href="#">Change username</b-dropdown-item>
          <b-dropdown-item href="#">Change password</b-dropdown-item>
          <b-dropdown-item href="#">Log out</b-dropdown-item>
        </b-dropdown>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>
<script>
export default {
  name: "NavBar",
  methods: {}
};
</script>
<style scoped>
.brand {
  margin-left: 5px;
}
.nav-bar {
  position: fixed;
  padding: 1em;
  margin: 0;
  border-bottom-left-radius: 40px;
  z-index: 1;
  background-color: white;
  height: 60px;
  width: 100%;
  top: 0;
}
.notification {
  width: 15px;
}
.user {
  width: 20px;
}
</style>