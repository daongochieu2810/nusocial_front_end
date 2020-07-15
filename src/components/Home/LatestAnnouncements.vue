<template>
  <Announcements
    :datePicker="false"
    :wordEdit="false"
    :title="'Latest Announcements'"
    :allPosts="allPosts"
  ></Announcements>
</template>

<script>
import Announcements from "../Community/Announcements";
export default {
  props: {
    allPosts: Array
  },
  components: {
    Announcements
  }
};
</script>