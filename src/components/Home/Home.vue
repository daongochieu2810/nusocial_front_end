<template>
  <div>
    <transition @before-enter="enterStart" appear>
      <div id="row1">
        <History id="column12" />
        <Statistics id="column11" style="align-self: right;margin-right: 10px" />
      </div>
    </transition>
    <transition @before-enter="enterStart" appear>
      <Announcements style="margin-right: 20px" />
    </transition>
  </div>
</template>

<script>
import Statistics from "../Community/Statistics";
import Announcements from "../Community/Announcements";
import History from "./History";
export default {
  components: {
    Statistics,
    Announcements,
    History
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