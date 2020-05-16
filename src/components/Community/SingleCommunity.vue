<template>
<div>
<div id="row1">
 <Messages id="column11"/>
  <Posts id="column12"/>
</div>
 <Announcements/>
</div>
</template>

<script>
import Messages from './Messages'
import Announcements from './Announcements'
import Posts from './Posts'
  export default {
    components: {
      Messages,
      Announcements,
      Posts
    },
    data() {
      return {
       
      }
    }
  }
</script>
<style scoped>
#row1{
  display: flex;
  flex-direction: row;
}

#column11,
#column12 {
  display: flex;
  flex-direction: column;
}
</style>