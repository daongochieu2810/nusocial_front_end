<template>
  <div class="stat">
    <div class="headings">
      <p style="font-size:30px">Number of active members</p>
    </div>
    <div style="padding-top: 5px">
      <LineChart v-if="loaded" :chart-data="chartdata" />
    </div>
  </div>
</template>

<script>
import LineChart from "../Common/ChartRelated/LineChart";
export default {
  components: {
    LineChart
  },
  data() {
    return {
      loaded: true
    };
  }
};
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

.headings p {
  margin-top: 10px;
  padding: 0;
  margin-left: 9px;
  display: inline-block;
  vertical-align: top;
  color: white;
}
</style>