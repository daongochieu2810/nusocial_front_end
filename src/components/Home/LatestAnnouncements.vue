<template>
 <Announcements :datePicker="false" :wordEdit="false" :title="'Latest Announcements'">
 </Announcements>
</template>

<script>
import Announcements from '../Community/Announcements'
export default {
  components: {
    Announcements
  }
}
</script>