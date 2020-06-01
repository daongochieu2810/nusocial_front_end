<template>
  <AuthEdit>
    <template name="edit">
      <form action="#" @submit.prevent="submit">
        <div class="form-group">
          <label>New password</label>
          <input type="text" class="form-control" placeholder="Email" v-model="form.new_username" />
        </div>
        <div class="form-group">
          <label>New password again</label>
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            v-model="form.re_new_username"
          />
        </div>
        <div class="form-group">
          <label>Current password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="form.current_password"
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
        current_password: null,
        new_password: null,
        re_new_password: null
      }
    };
  }
};
</script>