<template>
  <AuthEdit>
    <template name="edit">
      <form action="#" @submit.prevent="submit">
        <div class="form-group">
          <label>New username</label>
          <input type="text" class="form-control" placeholder="Email" v-model="form.username" />
        </div>
        <div class="form-group">
          <label>Current password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="form.password"
          />
        </div>
        <button type="submit" class="btn btn-dark" style="margin-right:20px">Edit</button>
        <router-link to="/">Cancel</router-link>
      </form>
    </template>
  </AuthEdit>
</template>
<script>
import AuthEdit from "./AuthEdit";
export default {
  components: {
    AuthEdit
  },
  data() {
    return {
      form: {
        username: null,
        password: null
      }
    };
  }
};
</script>