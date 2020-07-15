<template>
    <p>Hi, authenticating</p>
</template>

<script>
const params = window.location.search;

const code = new URLSearchParams(params).get("code");

const url = "http://nusocial-bridge-api.herokuapp.com/auth?code=" + code;

var request = require("request");
request.post(
    {
        url: url,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    },
    function(error, response, body) {
        if (!error) {
            console.log(response);
            console.log(body);
        }
    }
);
</script>

<style scoped></style>
