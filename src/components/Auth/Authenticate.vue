<template>
  <p>Hi, authenticating</p>
</template>

<script>
const params = window.location.search;

const code = new URLSearchParams(params).get("code");

console.log(code);
</script>

<style scoped>
@media screen and (max-width: 450px) {
  .login-form {
    margin-top: 10%;
  }
}
@media screen and (min-width: 768px) {
  .login-form {
    margin-top: 50%;
  }
}
</style>