<template>
  <AuthTemplate>
    <template v-slot:heading>
      <h2>
        NUSocial Admin
        <br />Register Page
      </h2>
      <p>Register from here to access.</p>
    </template>
    <template v-slot:form>
      <div class="register-form">
        <form action="#" @submit.prevent="submit">
          <div class="form-group">
            <label>User Name</label>
            <input type="text" class="form-control" placeholder="User Name" v-model="form.name" />
          </div>
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
            <b-button size="lg" variant="primary">Register with NUSNET</b-button>
          </p>
          <button type="submit" class="btn btn-secondary">Register</button>
          <router-link to="/login" style="margin-left: 20px;">Already one of us ? Login !</router-link>
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
        name: "",
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      this.$store.commit("toggleLoading");
      fb.auth
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(user => {
          this.$store.commit("setCurrentUser", user.user);

          // create user obj
          fb.usersCollection
            .doc(user.user.uid)
            .set({
              name: this.form.name
            })
            .then(() => {
              this.$store.dispatch("fetchUserProfile");
              this.$router.push("/");
              this.$store.commit("toggleLoading");
            })
            .catch(err => {
              console.log(err);
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
  .register-form {
    margin-top: 10%;
  }
}

@media screen and (min-width: 768px) {
  .register-form {
    margin-top: 50%;
  }
}

.btn-black {
  background-color: #000 !important;
  color: #fff;
  margin-right: 20px;
}
</style>