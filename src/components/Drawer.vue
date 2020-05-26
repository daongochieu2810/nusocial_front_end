<template>
  <div class="drawer">
    <b-button v-b-toggle.sidebar-1 style="background-color: white;border:0">
      <img src="../assets/chevron_right.png" alt="open_drawer" style=";width: 20px;height: 20px" />
    </b-button>
    <b-sidebar id="sidebar-1" title="Friends" shadow>
      <div class="px-3 py-2">
      <div v-for="friend in allFriends" :key="friend.id" class="container" @click="openChat(friend.id)">
         <img
            src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-9/s960x960/78794853_2434835663499592_1312362149607112704_o.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=_4aBd_hMTBQAX_CGjB5&_nc_ht=scontent-xsp1-1.xx&_nc_tp=7&oh=a9e3f52490af5dfc6067038edb8de083&oe=5EE4C764"
            alt="Avatar"
          />
          <p>Dao Ngoc Hieu</p>
      </div>
      </div>
    </b-sidebar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allFriends:[]
    }
  },
  mounted() {
    this.allFriends = this.$store.state.chatbox;
    this.allFriends.push(...this.allFriends)
  },
  methods: {
    openChat(id) {
      this.$store.commit("changeBox", id);
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
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
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