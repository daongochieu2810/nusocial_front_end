<template>
    <p>Hi, authenticating</p>
</template>

<script>
import store from "../../store";
import router from "../../router.js";

const params = window.location.search;
const fb = require("../../backend.js");
const request = require("request");

store.commit("toggleLoading");

const code = new URLSearchParams(params).get("code");
const url = "https://nusocial-bridge-api.herokuapp.com/auth?code=" + code;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

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
                            function(error, response, body) {
                                if (!error) {
                                    response;
                                    const firebaseToken = body;
                                    console.log(firebaseToken);
                                    fb.auth
                                        .signInWithCustomToken(firebaseToken)
                                        .then((user) => {
                                            console.log(user.user);
                                            store.commit(
                                                "setCurrentUser",
                                                user.user
                                            );
                                            store
                                                .dispatch("fetchUserProfile")
                                                .then(() => {
                                                    router.push("/");
                                                });
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            store.commit("toggleLoading");
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
