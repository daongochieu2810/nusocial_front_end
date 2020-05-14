<template>
  <b-navbar class="nav-bar shadow">
    <b-navbar-brand to="/" class="brand">NUSocial Admin</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-item href="#">
        <img class="notification" src="../assets/bell-53.svg" />
      </b-nav-item>
      <b-nav-item href="#">
        <img class="user" src="../assets/face.svg" />
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