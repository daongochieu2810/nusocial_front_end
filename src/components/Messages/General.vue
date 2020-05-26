<template>
  <div>
    <transition-group @before-enter="enterStart" appear class="layout">
      <div key="stud">
        <StudentMess @openChat="openChat" />
      </div>
      <div key="admin">
        <AdminMess />
      </div>
      <div key="sys" style="margin-right: 10px">
        <SystemMess />
      </div>
    </transition-group>
  </div>
</template>

<script>
import StudentMess from "./StudentMess";
import AdminMess from "./AdminMess";
import SystemMess from "./SystemMess";
export default {
  name: "app",
  components: {
    StudentMess,
    AdminMess,
    SystemMess
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
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: row;
}
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
</style>
