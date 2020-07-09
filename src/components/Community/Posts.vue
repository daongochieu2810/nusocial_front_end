<template>
  <PostRelated
    :datePicker="true"
    :posts="true"
    @todayChosen="showTodayPosts"
    @updateDate="showDatePosts"
  >
    <template v-slot:title>{{title}}</template>
    <template v-slot:content>
      <perfect-scrollbar>
        <div class="container" v-for="post in filteredPosts" :key="post.post.id">
          <b-button
            pill
            variant="outline-danger"
            style="float:right"
            @click="deletePost(post.post.communityID, post.post.id)"
          >Delete</b-button>
          <img
            :src="post.owner.profilePicturePath"
            alt="Avatar"
            style="border: solid 1px white"
            class="image"
          />
          <h6 style="color: white">{{post.owner.name}}</h6>
          <p style="color: white">{{post.post.textContent}}</p>
          <perfect-scrollbar class="small-scroll" style="display: flex; flex-direction: row">
            <img
              v-for="image in post.post.imageList"
              :key="image"
              alt="image"
              :src="image"
              class="post-image"
            />
          </perfect-scrollbar>
          <div>
            <a
              v-for="file in post.post.videoList"
              :key="file"
              :href="file"
            >{{getFileName(file.toString())}}</a>
          </div>
          <span class="time-right">{{post.post.timeStamp.toDate()}}</span>
        </div>
      </perfect-scrollbar>
    </template>
  </PostRelated>
</template>

<script>
//import Loading from "../Common/Loading";
import PostRelated from "../Common/PostRelated";
import moment from "moment";
const fb = require("../../backend.js");
moment().format();
export default {
  components: {
    PostRelated
  },
  props: {
    allPosts: Array,
    title: String
  },
  data() {
    return {
      currDate: "",
      filteredPosts: []
    };
  },
  mounted() {
    this.filteredPosts = this.allPosts;
  },
  methods: {
    getFileName(url) {
      let start_index = 0;
      let end_index = 0;
      let count = 0;
      for (let i = 0; i < url.length; i++) {
        if (url[i] == "%") {
          if (count == 0) count++;
          else if (count == 1) start_index = i + 3;
        } else if (url[i] == "?") {
          end_index = i;
          break;
        }
      }
      return url.substring(start_index, end_index);
    },
    async deletePost(commID, postID) {
      await fb.communityCollection
        .doc(commID)
        .collection("posts")
        .doc(postID)
        .delete()
        .then(() => {
          /*var index = 0;
          for (let i in this.allPosts) {
            if (this.allPosts[i].id == postID) {
              index = i;
              break;
            }
          }
          this.allPosts.splice(index, 1);*/
          this.filteredPosts = this.allPosts;
        });
    },
    testDate() {
      console.log(this.currDate);
    },
    showTodayPosts() {
      var today = moment();
      this.filteredPosts = this.allPosts.filter(data => {
        var post = data.post;
        var postDate = moment(post.timeStamp.toDate());
        if (
          postDate.month() == today.month() &&
          postDate.date() == today.date() &&
          postDate.year() == today.year()
        )
          return true;
      });
    },
    showDatePosts(date) {
      date = moment(date);
      this.filteredPosts = this.allPosts.filter(data => {
        var post = data.post;
        var postDate = moment(post.timeStamp.toDate());
        //console.log(postDate.diff(date, "date"));
        if (
          postDate.month() == date.month() &&
          postDate.date() == date.date() &&
          postDate.year() == date.year()
        )
          return true;
      });
    }
  }
};
</script>
<style scoped>
/* Chat containers */
.container {
  border: 2px solid #dedede;
  background-color: black;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  margin-left: 5px;
  width: inherit;
}

/* Clear floats */
.container::after {
  content: "";
  clear: both;
  display: table;
}

/* Style images */
.image {
  float: left;
  height: 50px;
  width: 50px;
  margin-right: 20px;
  border-radius: 50%;
  object-fit: cover; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
}

/* Style the right image */
.container img.right {
  float: right;
  margin-left: 20px;
  margin-right: 0;
}

/* Style time text */
.time-right {
  float: right;
  color: #aaa;
}

/* Style time text */
.time-left {
  float: left;
  color: #999;
}

.ps {
  height: 61vh;
  width: auto;
}
.small-scroll {
  height: auto !important;
  width: auto;
}
.post-image {
  max-height: 300px;
  margin-right: 5px;
}
</style>