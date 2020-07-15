<template>
  <div class="user-list">
    <table class style="padding-top: 5px">
      <tbody>
        <tr v-for="user in participants" :key="user.id">
          <td style="text-align: center;">
            <img :src="user.profilePicturePath" class="img-msg" />
          </td>
          <td class="user-element">{{user.name}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    participants: {
      type: Array,
      required: true
    }
  }
};
</script>
<style scoped>
.user-list {
  height: 100%;
  overflow: auto;
  padding-left: 5px;
  padding-top: 8px;
}
.img-msg {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 5px;
  object-fit: cover; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
}
.user-element {
  font-size: 20px;
  vertical-align: middle;
}
</style>
