<template>
  <div style="padding: 5px">
    <div id="row1">
      <div class="wrapper shadow" id="column11" style="width: 70vw">
        <div class="chart">
          <h2 style="color: white">Number of active members across all communities</h2>
          <LineChart v-if="loaded" :chart-data="chartdata"></LineChart>
        </div>
      </div>
      <div class="pie-chart" id="column12">
        <h5 style="color: white;margin-left: 20px;margin-top:10px">Distribution of types of posts</h5>
        <pie-chart style="margin-left: 1%;"></pie-chart>
      </div>
    </div>
    <div id="row2">
      <div
        id="column21"
        class="wrapper shadow"
        style="margin-top: 20px;width: 60vw;margin-bottom: 10px;height: 455px"
      >
        <div class="chart" style="padding-bottom: 19px">
          <h2 style="color: white">Number of posts across all communities</h2>
          <LineChart v-if="loaded" :chart-data="chartdata"></LineChart>
        </div>
      </div>
      <div id="column22">
        <notes
          style="margin-top: 20px;margin-left: 30px"
          :sizes="{maxHeight: '43vh',
  width: 'auto'}"
          :inDashBoard="true"
        ></notes>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "../Common/ChartRelated/LineChart.js";
import PieChart from "../Common/ChartRelated/PieChart.js";
import Notes from "./Notes";
export default {
  components: {
    LineChart,
    PieChart,
    Notes
  },
  data() {
    return {
      loaded: true,
      chartdata: null,
      datas: [],
      error: null
    };
  }
};
</script>

<style scoped>
.chart {
  margin-left: 20px;
}

.wrapper {
  margin-left: 120px;
  margin-top: 80px;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  background-color: black;
}
.pie-chart {
  width: 23vw;
  height: 55vh;
  margin-left: 30px;
  margin-top: 80px;
  background-color: black;
  border-radius: 10px;
}
#row1,
#row2 {
  display: flex;
  flex-direction: row;
}

#column11,
#column12,
#column21,
#column22 {
  display: flex;
  flex-direction: column;
}
</style>