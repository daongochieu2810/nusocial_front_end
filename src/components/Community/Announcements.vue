<template>
  <PostRelated
    :datePicker="datePicker"
    :wordEdit="wordEdit"
    :announcements="true"
    :commData="commData"
    @todayChosen="showTodayPosts"
    @updateDate="showDatePosts"
  >
    <template v-slot:title>{{title}}</template>
    <template v-slot:content>
      <div v-for="post in filteredPosts" :key="post.post.id" class="row">
        <p class="timestamp">{{getDate(post.post)}}</p>
        <div class="container">
          <img :src="post.owner.profilePicturePath" alt="Avatar" class="images" />
          <h6 style="color: white">{{post.owner.name}}</h6>
          <b-badge v-if="!wordEdit" variant="light" style="float:right">{{post.post.parentCommName}}</b-badge>

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
        <p class="stats">{{post.post.userLikeList.length}} like(s)</p>
      </div>
    </template>
  </PostRelated>
</template>

<script>
import PostRelated from "../Common/PostRelated";
import moment from "moment";
//const fb = require("../../backend.js");
moment().format();
export default {
  components: {
    PostRelated
  },
  props: {
    datePicker: {
      type: Boolean,
      default: true
    },
    wordEdit: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "Announcements"
    },
    allPosts: Array,
    commData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      newAnnouncement: "",
      allRows: [],
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
    getDate(data) {
      return moment(data.timeStamp.toDate()).format("HH:mm:ss DD/MM/YY");
    },
    testMake() {
      console.log(this.newAnnouncement);
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
  margin-left: 50px;
}
.row {
  display: grid;
  grid-template-columns: 1fr 10fr 3fr;
  grid-template-rows: auto auto;
  margin-left: 10px;
}

.timestamp,
.stats {
  display: table-cell;
  margin: auto;
  color: white;
  text-align: center;
}
/* Clear floats */
.container::after {
  content: "";
  clear: both;
  display: table;
}

/* Style images */
.images {
  float: left;
  height: 50px;
  width: 50px;
  margin-right: 20px;
  border-radius: 50%;
  object-fit: cover; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
}

/* Style time text */
.time-right {
  float: right;
  color: #aaa;
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