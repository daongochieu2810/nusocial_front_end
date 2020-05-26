<template>
  <div>
    <transition @before-enter="enterStart" appear>
      <div id="row1">
        <Posts id="column12" />
        <Statistics id="column11" style="align-self: right;margin-right: 10px;height: 68vh" />
      </div>
    </transition>
    <transition @before-enter="enterStart" appear>
      <Announcements style="margin-right: 20px" />
    </transition>
  </div>
</template>

<script>
import Statistics from "./Statistics";
import Announcements from "./Announcements";
import Posts from "./Posts";
export default {
  components: {
    Statistics,
    Announcements,
    Posts
  },
  data() {
    return {};
  },
  methods: {
    enterStart: function(el) {
      el.classList.add("testing-enter");
    }
  }
};
</script>
<style scoped>
#row1,
#row2 {
  display: flex;
  flex-direction: row;
}

#column11,
#column12 {
  display: flex;
  flex-direction: column;
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