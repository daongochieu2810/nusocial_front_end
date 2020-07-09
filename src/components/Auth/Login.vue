<template>
  <AuthTemplate>
    <template v-slot:heading>
      <h2>
        NUSocial Admin
        <br />Login Page
      </h2>
      <p>Login from here to access.</p>
    </template>
    <template v-slot:form>
      <div class="login-form">
        <form action="#" @submit.prevent="submit">
          <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" placeholder="Email" v-model="form.email" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="form.password"
            />
          </div>
          <p>
            <b-button size="lg" variant="primary" @click="nusLogIn">Log in with NUSNET</b-button>
          </p>
          <button type="submit" class="btn btn-dark" style="margin-right:20px">Login</button>
          <!--<router-link to="/register">Register</router-link>-->
        </form>
      </div>
    </template>
  </AuthTemplate>
</template>

<script>
const fb = require("../../backend.js");
import AuthTemplate from "./AuthTemplate";
//import axios from "axios";
export default {
  components: {
    AuthTemplate
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    nusLogIn() {
      // let authUrl =
      //   "https://vafs.nus.edu.sg/adfs/oauth2/authorize?response_type=code&client_id=INC000002163230&resource=sg_edu_nus_oauth&redirect_uri=https%3A%2F%2Ffirestore.googleapis.com%2Fv1%2Fprojects%2Fnusocial-7c7e8%2Fdatabases%2F%28default%29%2Fdocuments%2Fusers%2F";

      // this.$router.push(authUrl);
      this.logInNUSNET().then(res => console.log(res));
    },
    async logInNUSNET() {
      let authUrl =
        "https://vafs.nus.edu.sg/adfs/oauth2/authorize?response_type=code&client_id=INC000002163230&resource=sg_edu_nus_oauth&redirect_uri=https%3A%2F%2Ffirestore.googleapis.com%2Fv1%2Fprojects%2Fnusocial-7c7e8%2Fdatabases%2F%28default%29%2Fdocuments%2Fusers%2F";

      /*let baseUrl = "https://luminus.azure-api.net/login/ADFSToken"
      let config = {
        headers: {
          "Ocp-Apim-Subscription-Key": "c9672e39d6854ec084706e9a944f8b21",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "redirect_uri":
                "https://firestore.googleapis.com/v1/projects/nusocial-7c7e8/databases/(default)/documents/users/",
        "client_id":"INC000002163230",
        "code": code
      }*/
      var res = null;
      await fetch(authUrl, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        // headers: {
        //   "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer" //, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
      }).then(response => {
        console.log(response);
        res = response;
      });
      /*await axios.post(authUrl).then(response => {
        console.log(response);
        res = response;
      });*/
      return res;
    },
    submit() {
      this.$store.commit("toggleLoading");
      fb.auth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(user => {
          console.log(user.user);
          this.$store.commit("setCurrentUser", user.user);
          this.$store.dispatch("fetchUserProfile").then(() => {
            this.$router.push("/");
            this.$store.commit("toggleLoading");
          });
        })
        .catch(err => {
          console.log(err);
          this.$store.commit("toggleLoading");
        });
    }
  }
};
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