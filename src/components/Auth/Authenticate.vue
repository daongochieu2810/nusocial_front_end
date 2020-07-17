<template>
  <p>Hi, authenticating</p>
</template>

<script>
const params = window.location.search;

const code = new URLSearchParams(params).get("code");

const url = "https://nusocial-bridge-api.herokuapp.com/auth?code=" + code;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
var request = require("request");
request.post(
  {
    url: url,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    rejectUnauthorized: false,
    requestCert: false,
    agent: false
  },
  function(error, response, body) {
    if (!error) {
      var accessToken = JSON.parse(body)["access_token"];
      console.log(accessToken);
      process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
      request.post(
        {
          url:
            "https://nusocial-bridge-api.herokuapp.com/profile?token=" +
            accessToken,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          rejectUnauthorized: false,
          requestCert: false,
          agent: false
        },
        function(error, response, body) {
          if (!error) {
            console.log(body);
          }
        }
      );
    }
  }
);
</script>

<style scoped></style>
