<template>
  <AuthTemplate>
    <template v-slot:heading>
      <h2>NUSocial Admin</h2>
      <p>Edit authentication information</p>
    </template>
    <template v-slot:form>
      <div class="edit-form">
        <slot v-slot:edit></slot>
      </div>
    </template>
  </AuthTemplate>
</template>
<script>
import AuthTemplate from "./AuthTemplate";
export default {
  components: {
    AuthTemplate
  }
};
</script>
<style scoped>
@media screen and (max-width: 450px) {
  .edit-form {
    margin-top: 10%;
  }
}
@media screen and (min-width: 768px) {
  .edit-form {
    margin-top: 50%;
  }
}
</style>