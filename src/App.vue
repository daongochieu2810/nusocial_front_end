<template>
  <div>
    <SideBar />
    <NavBar />
    <Drawer />
    <!---a fixed container to keep chatboxes at the bottom-->
    <div class="container">
      <div v-for="chat in getBoxes" :key="chat.id">
        <ChatBox
          :isOpen="chat.isOpen"
          :id="chat.id"
          :class="{space: chat.isOpen}"
          :clicked="chat.clicked"
          style="pointer-events: auto"
        />
      </div>
    </div>
    <router-view class="main-view"></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import ChatBox from "./components/Messages/ChatBox";
import Drawer from "./components/Drawer";
export default {
  name: "App",
  components: {
    NavBar,
    SideBar,
    ChatBox,
    Drawer
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    for (let i = 0; i < 7; i++) {
      this.$store.commit("addChatbox", {
        id: i,
        isOpen: false,
        clicked: false
      });
    }
  },
  computed: {
    getBoxes() {
      return this.$store.state.chatbox;
    }
  }
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
</style>