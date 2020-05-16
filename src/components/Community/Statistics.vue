<template>
<div class="stat">
  <div class="headings">
<p>Number of active members</p>
</div>
<div style="padding-top: 30px">
 <chart v-if="loaded" :chart-data="chartdata"></chart>
</div>
</div>
</template>

<script>
import Chart from '../Dashboard/Chart'
  export default {
    components: {
      Chart
    },
    data() {
      return {
        loaded: true
      }
    }
  }
</script>
<style scoped>
.stat {
    margin-left: 40px;
    margin-top: 80px;
    background-color: black;
    border-radius: 10px;
    border: 2px solid #dedede;
    padding: 5px;
    width: 40%;
    padding-right: 10px;
    padding-left: 10px;
}

.headings p,a{
    margin:0;
    padding:0;
    margin-left: 20px;
    font-size: 36px;
    line-height: 80px;
     display: inline-block;
    vertical-align: top;
    color: white;
}
</style>