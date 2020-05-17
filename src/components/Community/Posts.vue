<template>
  <div class="posts">
    <div class="headings">
      <p style="font-size: 36px">My posts</p>
      <div id="datepicker" style="justify-self: end;padding: 10px">
        <b-form-datepicker v-model="currDate" @hidden="testDate"></b-form-datepicker>
      </div>
      <div style="justify-self: end;padding: 10px">
        <b-button variant="outline-primary">Today</b-button>
      </div>
    </div>
    <perfect-scrollbar>
      <div class="container" v-for="post in allPosts" :key="post.id">
        <img
          src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-9/s960x960/78794853_2434835663499592_1312362149607112704_o.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=_4aBd_hMTBQAX_CGjB5&_nc_ht=scontent-xsp1-1.xx&_nc_tp=7&oh=a9e3f52490af5dfc6067038edb8de083&oe=5EE4C764"
          alt="Avatar"
        />
        <p style="color: white">
          It is a long established fact
          that a reader will be distracted by the readable
          content of a page when looking at its layout.
          The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as
          opposed to using 'Content here, content here',
          making it look like readable English.
          Many desktop publishing packages and web page
          editors now use Lorem Ipsum as their default
          model text, and a search for 'lorem ipsum'
          will uncover many web sites still in their
          infancy. Various versions have evolved over
          the years, sometimes by accident, sometimes
          on purpose (injected humour and the like).
        </p>
        <span class="time-right">11:02</span>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allPosts: [],
      currDate: ""
    };
  },
  mounted() {
    for (let i = 0; i < 7; i++) {
      this.allPosts.push({
        id: i
      });
    }
  },
  methods: {
    testDate() {
      console.log(this.currDate);
    }
  }
};
</script>
<style scoped>
.posts {
  margin-left: 120px;
  margin-top: 80px;
  background-color: black;
  border-radius: 10px;
  border: 2px solid #dedede;
  padding: 5px;
  width: 50%;
  padding-right: 20px;
}
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
.headings {
  display: grid;
  grid-template-columns: 3fr 5fr 1fr;
  grid-template-rows: auto auto;
  color: white;
  padding: 10px;
}
.ps {
  height: 50vh;
  width: auto;
}
</style>