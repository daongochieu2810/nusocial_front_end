<template>
  <p>Hi, authenticating</p>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      code: "",
      access_token: ""
    };
  },
  mounted() {
    const params = window.location.search;
    this.code = new URLSearchParams(params).get("code");
    this.access_token = new URLSearchParams(params).get("access_token");
    //console.log(code);
    if (this.code != "" && this.code != null) {
      this.getTrueAccessToken();
    }
    if (this.access_token != "" && this.access_token != null) {
      console.log(this.access_token);
    }
  },
  methods: {
    async getTrueAccessToken() {
      const params = {
        headers: {
          "Ocp-Apim-Subscription-Key": "c9672e39d6854ec084706e9a944f8b21",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        grant_type: "authorization_code",
        resource: "sg_edu_nus_oauth",
        client_id: "INC000002163230",
        code: this.code,
        redirect_uri: "https%3A//nusocial-admin.herokuapp.com/authenticate"
      };
      const response = await axios.post(
        "https://luminus.azure-api.net/login/ADFSToken",
        params
      );
      return response;
    }
  }
};
</script>

<style scoped>
</style>