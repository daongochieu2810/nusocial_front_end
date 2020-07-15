<template>
    <p>Hi, authenticating</p>
</template>

<script>
const params = window.location.search;

const code = new URLSearchParams(params).get("code");

const url = "http://nusocial-bridge-api.herokuapp.com/auth?code=" + code;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
var request = require("request");
request.post(
    {
        url: url,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        rejectUnauthorized: false,
        requestCert: false,
        agent: false,
    },
    function(error, response, body) {
        if (!error) {
            console.log(response);
            console.log(body);
            console.log(error);
        }
    }
);
</script>

<style scoped></style>
