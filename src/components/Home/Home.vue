<template>
  <div>
    <transition @before-enter="enterStart" appear>
      <div id="row1">
        <History id="column11" :inHistory="false" />
        <div id="column12">
          <Notes
            style="margin-top: 80px;margin-left: 30px;border: 2px solid white;margin-right:10px;"
            :sizes="{maxHeight: '50vh',
  width: 'auto'}"
            :wordEdit="false"
            :inDashBoard="false"
          />
        </div>
      </div>
    </transition>
    <transition @before-enter="enterStart" appear>
      <LatestAnnouncements />
    </transition>
  </div>
</template>

<script>
import Notes from "../Dashboard/Notes";
import LatestAnnouncements from "./LatestAnnouncements";
import History from "../History/History";
export default {
  components: {
    Notes,
    LatestAnnouncements,
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