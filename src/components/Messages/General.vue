<template>
  <div>
    <transition-group @before-enter="enterStart" appear >
      <div key="stud">
        <StudentMess style="float:left" @openChat="openChat" />
      </div>
      <div key="admin">
        <AdminMess style="float:left" />
      </div>
      <div key="sys">
        <SystemMess style="float:left" />
      </div>
    </transition-group>
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
  </div>
</template>

<script>
import StudentMess from "./StudentMess";
import AdminMess from "./AdminMess";
import SystemMess from "./SystemMess";
import ChatBox from "./ChatBox";
export default {
  name: "app",
  components: {
    StudentMess,
    AdminMess,
    SystemMess,
    ChatBox
  },
  data() {
    return {};
  },
  methods: {
    enterStart: function(el) {
      el.classList.add("testing-enter");
    },
    openChat(id) {
      this.$store.commit("changeBox", id);
    }
  },
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

<style scoped>
.testing-enter {
  animation: enter 0.5s;
}
@keyframes enter {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.container {
  position: fixed;
  bottom: 0;
  right: 0px;
  width: auto;
  display: flex;
  flex-direction: row;
  max-width: 100%;
  padding-right: 5px;
  pointer-events: none;
}
.space {
  margin-left: 10px;
}
</style>
