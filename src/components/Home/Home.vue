<template>
  <div>
    <transition @before-enter="enterStart" appear>
      <div id="row1">
        <History id="column11" :inHistory="false" />
        <div id="column12">
          <Notes
            style="border: 2px solid white; margin-left: 20px;margin-top: 80px;margin-right: 20px"
            :sizes="{maxHeight: '50vh',
  width: 'auto'}"
            :wordEdit="false"
            :inDashBoard="false"
            :notes="userProfile.notesForAdmin"
          />
        </div>
      </div>
    </transition>
    <transition @before-enter="enterStart" appear>
      <LatestAnnouncements :allPosts="results" style="margin-bottom: 20px" />
    </transition>
  </div>
</template>

<script>
import Notes from "../Dashboard/Notes";
import LatestAnnouncements from "./LatestAnnouncements";
import History from "../History/History";
import { mapState } from "vuex";
const fb = require("../../backend.js");
import moment from "moment";
moment().format();
export default {
  components: {
    Notes,
    LatestAnnouncements,
    History
  },
  data() {
    return {
      latestAnnouncements: [],
      allMembers: []
    };
  },
  methods: {
    enterStart: function(el) {
      el.classList.add("testing-enter");
    },
    async fetchLatestAnnoucements(id) {
      await fb.communityCollection
        .doc(id)
        .collection("posts")
        .where("postType", "==", "Announcement")
        .get()
        .then(res => {
          res.forEach(doc => {
            this.getUsers(doc.data().ownerUid).then(owner => {
              this.latestAnnouncements.push({ post: doc.data(), owner: owner });
            });
          });
        });
    },
    async getUsers(id) {
      //this.isLoading = true;
      var user = null;
      await fb.userCollection
        .doc(id)
        .get()
        .then(res => {
          user = res.data();
          //this.isLoading = false;
        });
      return user;
    }
  },

  computed: {
    ...mapState(["userProfile", "all_message_channels"]),
    results() {
      var holder = this.latestAnnouncements;
      holder.sort(function(a, b) {
        var date_a = a.post.timeStamp.toDate();
        var date_b = b.post.timeStamp.toDate();
        //console.log(date_a, date_b);
        return moment(date_b) - moment(date_a);
      });
      return holder;
    }
  },
  mounted() {
    //console.log("home1");
    //this.getUsers();
    for (let comm of this.userProfile.communities) {
      //console.log("home2");
      this.fetchLatestAnnoucements(comm);
    }
    //console.log(this.userProfile);
    //this.$store.dispatch("fetchCommunities");
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