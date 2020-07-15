<template>
  <div class="boxes">
    <div class="headings">
      <p style="font-size: 36px">Group Chat</p>
    </div>
    <Loading style="margin-left: 45%;margin-bottom: 5%;margin-top:5%" v-if="isLoading" />
    <div v-if="channels.length == 0 && !isLoading">
      <div class="container" style="text-align: center;color: white">Empty</div>
    </div>
    <div v-for="post in allItems" :key="post.id" class="row">
      <div class="container" v-if="!isLoading">
        <div v-for="user in post.partners.slice(0,3)" :key="user.uid">
          <img :src="user.profilePicturePath" alt="Avatar" class="images" />
        </div>
        <h4 style="color: white">{{post.name}}</h4>
        <p style="color: white">{{post.latestMsg || "--blank--"}}</p>
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
const fb = require("../../backend.js");
import Loading from "../Common/Loading";
import moment from "moment";
moment().format();
import { mapState } from "vuex";
export default {
  components: {
    Loading
  },
  computed: {
    ...mapState(["userProfile", "all_message_channels"])
  },
  data() {
    return {
      isLoading: false,
      allItems: [],
      listOfRawMsg: [],
      latestMsg: "",
      currentIndex: 0,
      currentIndex1: 0,
      listOfPartners: []
    };
  },
  watch: {
    listOfRawMsg: function() {
      if (this.listOfRawMsg.length > 0) {
        //console.log(this.listOfUser);
        var curr = this.listOfRawMsg[this.currentIndex1];
        this.currentIndex1++;
        this.allItems.push({
          partners: curr.users,
          id: curr.id,
          latestMsg: curr.latestMessage,
          latestTime: curr.latestTime,
          name: curr.name
        });
        //console.log(this.currentIndex1);
        //console.log(curr);
        //this.fetchMessages(curr.id);
      }
    },
    latestMsg: function() {
      if (this.latestMsg != "") {
        console.log(this.latestMsg);
        var curr = this.listOfRawMsg[this.currentIndex];
        this.allItems.push({
          partners: curr.users,
          id: curr.id,
          latestMsg: this.latestMsg,
          name: curr.name
        });
        this.currentIndex++;
      }
    },
    channels: function() {
      for (let channel of this.channels) {
        var listOfPartners = [];
        for (let user of channel.recipients) {
          if (user.first != this.userProfile.uid) {
            listOfPartners.push(user.first);
          }
        }
        this.fetchUsers(listOfPartners).then(data => {
          //console.log(data);
          this.listOfRawMsg.push({
            latestMessage: channel.latestMessage,
            latestTime: channel.latestTime,
            users: data,
            id: channel.id,
            name: channel.name
          });
        });
      }
    }
  },
  props: {
    channels: Array
  },
  mounted() {},
  methods: {
    getDate(date) {
      return moment(date).format("HH:mm:ss DD/MM/YY");
    },
    openChatWindow(id) {
      this.$emit("openChat", id);
    },
    async fetchUsers(listOfPartners) {
      var users = [];
      this.isLoading = true;
      await fb.userCollection
        .where("uid", "in", listOfPartners)
        .get()
        .then(res => {
          res.forEach(doc => {
            users.push(doc.data());
          });
          this.isLoading = false;
        });
      return users;
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
          if (change && change.type == "added") {
            let doc = change.doc;
            var holder = doc.data();
            if (holder.sender == this.userProfile.uid) {
              holder.messageText = "From you: " + holder.messageText;
            }
            console.log(holder);
            this.latestMsg = holder;
          } else if (change == null) {
            this.latestMsg = "--blank--";
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
  margin-left: 20px;
  margin-top: 80px;
  background-color: grey;
  border-radius: 10px;
  border: 2px solid #dedede;
  padding: 5px;
  width: 50vw;
  padding-right: 20px;
}
/* Chat containers */
.container {
  border: 2px solid #dedede;
  background-color: grey;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  width: 95%;
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