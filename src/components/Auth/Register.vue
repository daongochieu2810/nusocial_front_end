<template>
<AuthTemplate>
    <template v-slot:heading>
         <h2>NUSocial<br> Register Page</h2>
            <p>Register from here to access.</p>
    </template>
    <template v-slot:form>
         <div class="login-form">
               <form @submit.prevent="submit">
                    <div class="form-group">
                     <label>User Name</label>
                     <input type="text" class="form-control" placeholder="User Name" v-model="form.name">
                  </div>
                  <div class="form-group">
                     <label>Email</label>
                     <input type="text" class="form-control" placeholder="Email" v-model="form.email">
                  </div>
                  <div class="form-group">
                     <label>Password</label>
                     <input type="password" class="form-control" placeholder="Password" v-model="form.password">
                  </div>
                  <p><b-button size="lg" variant="primary">Register with NUSNET</b-button></p>
                  <button type="submit" class="btn btn-secondary">Register</button>
                  <router-link to="/login" style="margin-left: 20px;">Already one of us ? Login !</router-link>
               </form>
            </div>
    </template>
</AuthTemplate>

</template>


<script>
import firebase from "firebase";
import AuthTemplate from './AuthTemplate'
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
  mounted() {
      
  },
  methods: {
    submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.form.name
            })
            .then(() => {});
              this.$router.push('/');
            console.log('name '+this.form.name)
        })
        .catch(err => {
          this.error = err.message;
          console.log('error '+this.error)
        });
    }
  }
};
</script>
<style scoped>
@media screen and (max-width: 450px) {
    .login-form{
        margin-top: 10%;
    }

    .register-form{
        margin-top: 10%;
    }
}

@media screen and (min-width: 768px){
    .login-form{
        margin-top: 50%;
    }

    .register-form{
        margin-top: 20%;
    }
}

.btn-black{
    background-color: #000 !important;
    color: #fff;
    margin-right: 20px;
}
</style>