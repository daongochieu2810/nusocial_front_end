<template>
  <div class="drawer">
    <b-button v-b-toggle.sidebar-1 style="background-color: white;border:0">
      <img src="../assets/chevron_right.png" alt="open_drawer" style=";width: 20px;height: 20px" />
    </b-button>
    <b-sidebar id="sidebar-1" title="Friends" shadow>
      <b-form-input type="search" style="margin: 5px 5px 5px 5px;width: 95%" v-model="searchTerm"></b-form-input>
      <div class="px-3 py-2">
        <div
          v-for="friend in filteredItems"
          :key="friend.id"
          class="container"
          @click="openChat(friend.id)"
        >
          <img :src="getImage(friend.id)" alt="Avatar" />
          <p>{{getName(friend)}}</p>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["all_message_channels", "chatbox", "userProfile"]),
    filteredItems: function() {
      if (this.searchTerm != "") {
        return this.chatItems.filter(item =>
          this.getName(item).includes(this.searchTerm)
        );
      } else return this.chatItems;
    }
  },
  data() {
    return {
      chatItems: [],
      searchTerm: ""
    };
  },
  props: {
    listOfImages: Array
  },
  watch: {
    userProfile: function() {
      this.$store.dispatch("fetchMessageChannels");
    },
    all_message_channels: function() {
      console.log("changes");
      this.$store.commit("clearChatbox");
      this.chatItems = [];
      let newValue = this.all_message_channels;

      for (let channel of newValue) {
        if (channel.name == "") {
          this.chatItems.push(channel);
        }
        this.$store.commit("addChatbox", {
          id: channel.id,
          isOpen: false,
          clicked: false,
          data: channel
        });
      }
    }
  },
  mounted() {},
  methods: {
    getName(friend) {
      return friend.recipients.length == 2 &&
        friend.recipients[1].first == this.userProfile.uid
        ? friend.recipients[0].second
        : friend.recipients[1].second;
    },
    openChat(id) {
      //console.log("here is " + id);
      //console.log(this.all_message_channels);
      this.$store.commit("changeBox", id);
      //console.log(this.clicked)
    },
    getImage(id) {
      for (let item of this.listOfImages) {
        if (item.id == id) return item.image;
      }
    }
  }
};
</script>
<style scoped>
.drawer {
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 4; /* Stay on top */
  top: 50vh; /* Stay at the top */
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
}
/* Chat containers */
.container {
  border: 2px solid #dedede;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  margin-left: 5px;
  width: inherit;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
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
</style>