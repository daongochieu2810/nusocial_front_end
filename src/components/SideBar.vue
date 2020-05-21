<template>
  <!-- Side navigation -->
  <div class="sidenav shadow">
    <div class="link" :class="{ active: curr1}">
      <router-link to="/dashboard">Dashboard</router-link>
    </div>
    <div class="link" :class="{ active: curr2}">
      <router-link to="/community">Community</router-link>
    </div>
    <div class="link" :class="{ active: curr3 }">
      <router-link to="/messages">Messages</router-link>
    </div>
    <div class="link" :class="{ active: curr4 }">
      <router-link to="/history">History</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "SideBar",
  methods: {},
  data() {
    return {
      curr1: false,
      curr2: false,
      curr3: false,
      curr4: false
    };
  },
  mounted() {
    let currPath = this.$router.currentRoute.fullPath;
    if (currPath == "/dashboard") this.curr1 = true;
    else this.curr1 = false;
    if (currPath == "/community" || currPath == "/community1")
      this.curr2 = true;
    else this.curr2 = false;
    if (currPath == "/messages") this.curr3 = true;
    else this.curr3 = false;
    if (currPath == "/history") this.curr4 = true;
    else this.curr4s = false;
  },
  watch: {
    $route(to, from) {
      console.log(from.path);
      if (to.path == "/dashboard") this.curr1 = true;
      else this.curr1 = false;
      if (to.path == "/community" || to.path == "/community1")
        this.curr2 = true;
      else this.curr2 = false;
      if (to.path == "/messages") this.curr3 = true;
      else this.curr3 = false;
      if (to.path == "/history") this.curr4 = true;
      else this.curr4 = false;
    }
  }
};
</script>
<style scoped>
/* The sidebar menu */
.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 100px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 0; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: white; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 70px;
}

/* The navigation menu links */
.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}
.sidenav a {
  font-size: 15px;
}
/* Style page content */
.main {
  margin-left: 160px; /* Same as the width of the sidebar */
  padding: 0px 10px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
.active,
.link:hover {
  background-image: linear-gradient(120deg, #fda085 0%, #f6d365 100%);
}
</style>