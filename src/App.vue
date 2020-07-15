<template>
  <div>
    <div :class="{blur : $store.state.isLoading}">
      <div
        v-if="$router.currentRoute.fullPath != '/register' && $router.currentRoute.fullPath != '/login' && $router.currentRoute.fullPath != '/editusername' && $router.currentRoute.fullPath != '/editpassword'"
      >
        <SideBar />
        <NavBar />
        <Drawer :listOfImages="listOfImages" />
        <!---a fixed container to keep chatboxes at the bottom-->
        <div class="container">
          <ChatBox
            v-for="chat in chatbox"
            :key="chat.id"
            :isOpen="chat.isOpen"
            :id="chat.id"
            :data="chat.data"
            :class="{space: chat.isOpen}"
            :clicked="chat.clicked"
            style="pointer-events: auto"
            @provideCoverImageChat="getImage"
          />
        </div>
      </div>
      <router-view class="main-view"></router-view>
    </div>
    <Loading v-if="$store.state.isLoading" style="position: fixed;bottom: 50vh;right: 50vw;" />
  </div>
</template>

<script>
import Loading from "./components/Common/Loading";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import ChatBox from "./components/Messages/ChatBox";
import Drawer from "./components/Drawer";
//const fb = require("./backend.js");
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    NavBar,
    SideBar,
    ChatBox,
    Drawer,
    Loading
  },
  data() {
    return {
      allMsgChannels: [],
      listOfImages: []
    };
  },
  computed: {
    ...mapState(["userProfile", "all_message_channels", "chatbox"])
  },
  methods: {
    getImage(data) {
      this.listOfImages.push(data);
    }
  },
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
<style scoped>
.container {
  position: fixed;
  bottom: 0;
  right: 0px;
  width: auto;
  display: flex;
  flex-direction: row;
  max-width: 100%;
  z-index: 3;
  padding-right: 5px;
  pointer-events: none;
}
.space {
  margin-left: 10px;
}
.blur {
  filter: blur(2px);
  pointer-events: none;
}
</style>