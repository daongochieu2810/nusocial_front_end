<template>
  <div :class="{history: !inHistory, 'history-in':inHistory}">
    <p v-if="!inHistory" class="heading">History</p>
    <Loading v-if="isLoading" style="margin-left: 45%;margin-bottom: 5%;margin-top:5%" />
    <transition-group v-if="inHistory && !isLoading" @before-enter="enterStart" appear>
      <div key="inHistory" style="margin-top: 10vh;margin-right: 2vw;">
        <b-table striped bordered hover dark :items="items"></b-table>
      </div>
    </transition-group>
    <perfect-scrollbar v-if="!inHistory && !isLoading">
      <div key="inHome">
        <b-table striped bordered hover dark :items="items"></b-table>
      </div>
    </perfect-scrollbar>
  </div>
</template>
<script>
const fb = require("../../backend.js");
import Loading from "../Common/Loading";
import moment from "moment";
moment().format();
import { mapState } from "vuex";
export default {
  components: {
    Loading
  },
  data() {
    return {
      allItems: [],
      allPosts: [],
      allComments: [],
      items: [],
      isLoading: false,
      lastIndex: 0
    };
  },
  props: {
    inHistory: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    allPosts: function() {
      if (this.allPosts.length > 0) {
        console.log(this.allPosts);
        for (let post of this.allPosts) {
          this.allItems.push(post);
        }
      }
    },
    allComments: function() {
      if (this.allComments.length > 0) {
        for (let comment of this.allComments) {
          this.allItems.push(comment);
        }
      }
    },
    allItems: function() {
      console.log(this.allItems);
      for (let i = this.lastIndex; i < this.allItems.length; i++) {
        var item = this.allItems[i];
        this.items.push({
          date: this.getDate(item),
          action_type: item.type == "post" ? "Made a post" : "Made a comment",
          details: this.getDetails(item)
        });
      }
      this.items.sort((a, b) => {
        var day_a = moment(a.date);
        var day_b = moment(b.date);
        return day_b.diff(day_a, "seconds");
      });
      this.allComments = [];
      this.allPosts = [];
      this.lastIndex = this.allItems.length;
    },
    communities: function() {
      console.log(this.communities);
      for (let comm of this.communities) {
        this.fetchAllPosts(comm.id);
      }
    }
  },
  mounted() {
    this.$store.dispatch("fetchCommunities");
    this.fetchAllComments();
  },
  computed: {
    history() {
      return this.allItems;
    },
    ...mapState(["communities", "userProfile"])
  },
  methods: {
    getDate(data) {
      return moment(data.data.timeStamp.toDate()).format("HH:mm:ss DD/MM/YY");
    },
    getDetails(data) {
      var details = "";
      if (data.type == "post") {
        if (data.data.imageList.length == 0) {
          details = data.data.textContent + " (No images attached) ";
        } else {
          details =
            data.data.textContent +
            " (" +
            data.data.imageList.length +
            " image(s) attached) ";
        }
        if (data.data.videoList.length == 0) {
          details += " (No files attached)";
        } else {
          details =
            data.data.textContent +
            " (" +
            data.data.videoList.length +
            " file(s) attached) ";
        }
        return details;
      } else {
        details = data.data.textContent;
        return details;
      }
    },
    enterStart: function(el) {
      el.classList.add("testing-enter");
    },
    deleteItem(id) {
      console.log("deleted " + id);
      this.allItems = this.allItems.filter(item => item.id !== id);
      console.log(this.allItems.length);
    },
    async fetchAllPosts(commID) {
      this.isLoading = true;
      await fb.communityCollection
        .doc(commID)
        .collection("posts")
        .where("ownerUid", "==", this.userProfile.uid)
        //.orderBy("timeStamp")
        .onSnapshot(res => {
          res.docChanges().forEach(change => {
            if (change.type == "added") {
              var doc = change.doc;
              this.allPosts.push({ data: doc.data(), type: "post" });
            }
          });
          this.isLoading = false;
        });
    },
    async fetchAllComments() {
      this.isLoading = true;
      await fb.commentCollection
        //.where("ownerUid", "==", this.userProfile.uid)
        //.orderBy("timeStamp")
        .onSnapshot(res => {
          res.docChanges().forEach(change => {
            if (change.type == "added") {
              var doc = change.doc;
              if (doc.data().ownerUid == this.userProfile.uid) {
                this.allComments.push({ data: doc.data(), type: "comment" });
              }
            }
          });

          this.isLoading = false;
        });
    }
  }
};
</script>
<style scoped>
.heading {
  color: white;
  font-size: 30px;
  padding-left: 20px;
  padding-bottom: 10px;
  margin-top: 15px;
  border-bottom: 1px solid white;
  margin-bottom: 0;
}
.history-in {
  margin-bottom: 20px;
  margin-left: 7vw;
}
.history {
  margin-left: 7vw;
  margin-top: 80px;
  background-color: black;
  border-radius: 10px;
  border: 2px solid #dedede;
  width: 50%;
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
.ps {
  height: 50vh;
  width: auto;
}
</style>