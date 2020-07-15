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
            <a :href="nusnetLink">
              <b-button size="lg" variant="primary">Log in with NUSNET</b-button>
            </a>
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
  computed: {
    nusnetLink: function() {
      return "https://vafs.nus.edu.sg/adfs/oauth2/authorize?response_type=code&client_id=INC000002163230&resource=sg_edu_nus_oauth&redirect_uri=https%3A//nusocial-admin.herokuapp.com/authenticate";
    }
  },
  methods: {
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