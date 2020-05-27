<template>
  <div>
    <div :class="{blur : $store.state.isLoading}">
      <div class="sidenav">
        <div class="login-main-text fadeInLeft">
          <slot name="heading"></slot>
        </div>
      </div>
      <div class="main">
        <div class="col-md-6 col-md-6 fadeInRight">
          <slot name="form"></slot>
        </div>
      </div>
    </div>
    <Loading v-if="$store.state.isLoading" style="position: fixed;bottom: 50vh;right: 50vw;" />
  </div>
</template>


<script>
import Loading from "../Common/Loading";
export default {
  components: {
    Loading
  }
};
</script>
<style scoped>
.blur {
  filter: blur(2px);
  pointer-events: none;
}
.sidenav {
  height: 100vh;
  background-color: #000;
  overflow-x: hidden;
  padding-top: 20px;
}
.main {
  height: 100vh;
  float: right;
  width: 60vw;
}
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
}

@media screen and (min-width: 768px) {
  .main {
    margin-left: 40%;
  }

  .sidenav {
    width: 40%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
  }
}

.login-main-text {
  margin-top: 20%;
  padding: 60px;
  color: #fff;
}

.login-main-text h2 {
  font-weight: 300;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fadeInLeft {
  animation-name: fadeInLeft;
  animation-duration: 1s;
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fadeInRight {
  animation-name: fadeInRight;
  animation-duration: 1s;
}
</style>