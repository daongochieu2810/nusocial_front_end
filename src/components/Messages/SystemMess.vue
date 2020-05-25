<template>
  <div class="posts">
    <div class="headings">
      <p style="font-size: 36px">System</p>
    </div>
    <div class="container" v-for="post in allPosts" :key="post.id">
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
    for (let i = 0; i < 2; i++) {
      this.allPosts.push({
        id: i
      });
    }
  },
  methods: {
    testDate() {
      console.log(this.currDate);
    },
    openChatWindow() {
      console.log("test");
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

.posts {
  margin-left: 20px;
  margin-top: 80px;
  background-color: black;
  border-radius: 10px;
  border: 2px solid #dedede;
  padding: 5px;
  width: 21.5vw;
}
/* Chat containers */
.container {
  border: 2px solid #dedede;
  background-color: black;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  width: 20vw;
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
  color: white;
  margin-left: 5px;
  margin-top: 5px;
}
.ps {
  height: 50vh;
  width: auto;
}
</style>