<template>
    <p>Hi, authenticating</p>
</template>

<script>
const params = window.location.search;
const fb = require("../../backend.js");
const code = new URLSearchParams(params).get("code");

const url = "https://nusocial-bridge-api.herokuapp.com/auth?code=" + code;
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
            var accessToken = JSON.parse(body)["access_token"];
            console.log(accessToken);
            process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
            request.post(
                {
                    url:
                        "https://nusocial-bridge-api.herokuapp.com/profile?token=" +
                        accessToken,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    rejectUnauthorized: false,
                    requestCert: false,
                    agent: false,
                },
                function(error, response, body) {
                    if (!error) {
                        const userID = body;
                        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
                        request.post(
                            {
                                url:
                                    "https://nusocial-bridge-api.herokuapp.com/firebaseToken?id=" +
                                    userID,
                                headers: {
                                    "Content-Type":
                                        "application/x-www-form-urlencoded",
                                },
                                rejectUnauthorized: false,
                                requestCert: false,
                                agent: false,
                            },
                            function(error, response, request) {
                                if (!error) {
                                    response;
                                    request;
                                    const firebaseToken = body;
                                    console.log("Abc" + firebaseToken);
                                    fb.auth
                                        .signInWithCustomToken(firebaseToken)
                                        .then((user) => {
                                            console.log(user.user);
                                            this.$store.commit(
                                                "setCurrentUser",
                                                user.user
                                            );
                                            this.$store
                                                .dispatch("fetchUserProfile")
                                                .then(() => {
                                                    this.$router.push("/");
                                                    this.$store.commit(
                                                        "toggleLoading"
                                                    );
                                                });
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            this.$store.commit("toggleLoading");
                                        });
                                }
                            }
                        );
                    }
                }
            );
        }
    }
);
</script>

<style scoped></style>
