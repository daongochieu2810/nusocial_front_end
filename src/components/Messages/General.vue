<template>
  <div>
    <transition-group @before-enter="enterStart" appear class="layout">
      <div key="stud">
        <StudentMess @openChat="openChat" :channels="singleChannels" />
      </div>
      <div key="admin" style="margin-right: 10px">
        <GroupMess @openChat="openChat" :channels="groupChannels" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import StudentMess from "./StudentMess";
import GroupMess from "./GroupMess";
//import SystemMess from "./SystemMess";
import { mapState } from "vuex";
export default {
  name: "app",
  components: {
    StudentMess,
    GroupMess
  },
  computed: {
    ...mapState(["all_message_channels", "userProfile"])
  },
  mounted() {
    //console.log(this.all_message_channels);
    for (let channel of this.all_message_channels) {
      if (channel.recipients.length > 2 || !channel.name == "") {
        this.groupChannels.push(channel);
      } else if (channel.recipients.length == 2) {
        this.singleChannels.push(channel);
      }
    }
  },
  data() {
    return {
      singleChannels: [],
      groupChannels: []
    };
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
