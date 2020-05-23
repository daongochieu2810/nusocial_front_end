<template>
  <div>
    <SideBar />
    <NavBar />
    <router-view class="main-view"></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
export default {
  name: "App",
  components: {
    NavBar,
    SideBar
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style>
body {
  font-family: "Crimson Pro", serif;
  font-size: 20px;
  margin: 0;
  min-height: 100vh;
  padding: 0;
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
}
</style>
