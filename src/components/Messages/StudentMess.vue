<template>
  <div class="boxes">
    <div class="headings">
      <p style="font-size: 36px">Individual Chat</p>
    </div>
    <Loading style="margin-left: 45%;margin-bottom: 5%;margin-top:5%" v-if="isLoading" />
    <div v-if="channels.length == 0 && !isLoading">
      <div class="container" style="text-align: center;color: white">Empty</div>
    </div>
    <div v-for="post in allItems" :key="post.id" class="row">
      <div class="container" v-if="!isLoading">
        <img :src="post.partner.profilePicturePath" alt="Avatar" />
        <h4 style="color: white">{{post.partner.name}}</h4>
        <p style="color: white">{{post.latestMsg}}</p>
        <span v-if="post.latestTime" class="time-right">{{getDate(post.latestTime.toDate())}}</span>
      </div>
      <div style="padding: 10px; display: flex;justify-content: center;align-items: center;">
        <div style="cursor: pointer;" @click="openChatWindow(post.id)" class="hvr-pulse">
          <img src="./../../assets/mess.png" alt="mess" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../Common/Loading";
const fb = require("../../backend.js");
import moment from "moment";
moment().format();
import { mapState } from "vuex";
export default {
  components: {
    Loading
  },
  props: {
    channels: Array
  },
  data() {
    return {
      isLoading: false,
      allItems: [],
      latestMsg: "",
      listOfUser: [],
      currentIndex: 0,
      currentIndex1: 0
    };
  },
  computed: {
    ...mapState(["userProfile"])
  },
  watch: {
    listOfUser: function() {
      if (this.listOfUser.length > 0) {
        //console.log(this.listOfUser);
        //var index = this.listOfUser.length - 1;
        var curr = this.listOfUser[this.currentIndex1];
        //this.listOfUser = []
        //console.log(this.currentIndex);
        this.allItems.push({
          partner: curr.user,
          id: curr.id,
          latestMsg: curr.latestMessage,
          latestTime: curr.latestTime
        });
        this.currentIndex1++;
        // this.fetchMessages(curr.id);
      }
    },
    latestMsg: function() {
      if (this.latestMsg != "") {
        console.log(this.latestMsg);
        var curr = this.listOfUser[this.currentIndex];
        this.allItems.push({
          partner: curr.user,
          id: curr.id,
          latestMsg: this.latestMsg
        });
        this.currentIndex++;
      }
    },
    channels: function() {
      for (let channel of this.channels) {
        for (let user of channel.recipients) {
          if (user.first != this.userProfile.uid) {
            this.fetchUser(user.first).then(data => {
              console.log(data);
              this.listOfUser.push({
                user: data,
                id: channel.id,
                latestMessage: channel.latestMessage,
                latestTime: channel.latestTime
              });
            });
          }
        }
      }
    }
  },
  mounted() {
    console.log(this.channels);
  },
  methods: {
    getDate(date) {
      return moment(date).format("HH:mm:ss DD/MM/YY");
    },
    openChatWindow(id) {
      this.$emit("openChat", id);
    },
    async fetchUser(id) {
      var user = null;
      this.isLoading = true;
      await fb.userCollection
        .doc(id)
        .get()
        .then(doc => {
          user = doc.data();
          this.isLoading = false;
        });
      return user;
    },
    async fetchMessages(id) {
      //var latestMsg = "";
      this.isLoading = true;
      await fb.messagesChannelCollection
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .limit(1)
        .onSnapshot(res => {
          var change = res.docChanges()[0];
          if (change.type == "added") {
            let doc = change.doc;
            var holder = doc.data();
            if (holder.sender == this.userProfile.uid) {
              var content = "";
              if (holder.messageType == "FILE") {
                content = holder.fileName == "" ? "File" : holder.fileName;
              } else content = holder.messageText;
              holder.messageText = "From you: " + content;
            }
            this.latestMsg = holder;
          }

          this.isLoading = false;
        });
      //return latestMsg;
    }
  }
};
</script>
<style scoped>
/* Pulse */
@-webkit-keyframes hvr-pulse {
  25% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  75% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
}
@keyframes hvr-pulse {
  25% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  75% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
}
.hvr-pulse {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
}
.hvr-pulse:hover,
.hvr-pulse:focus,
.hvr-pulse:active {
  -webkit-animation-name: hvr-pulse;
  animation-name: hvr-pulse;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

.row {
  display: grid;
  grid-template-columns: 10fr 2fr;
  padding-left: 20px;
}
.boxes {
  margin-left: 120px;
  margin-top: 80px;
  background-color: black;
  border-radius: 10px;
  border: 2px solid #dedede;
  padding: 5px;
  padding-right: 20px;
  width: 40vw;
}
/* Chat containers */
.container {
  border: 2px solid #dedede;
  background-color: black;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
}

/* Clear floats */
.container::after {
  content: "";
  clear: both;
  display: table;
}

/* Style images */
.container img {
  float: left;
  width: 60px;
  height: 60px;
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
.headings {
  color: white;
  margin-left: 5px;
  margin-top: 5px;
}
.ps {
  height: 50vh;
  width: auto;
}
</style>