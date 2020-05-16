<template>
  <div>
    <div id="row1">
      <div class="wrapper shadow" id="column11" style="width: 70vw">
        <div class="chart">
          <h2 style="color: white">Number of teams below NUSocial</h2>
          <chart v-if="loaded" :chart-data="chartdata"></chart>
        </div>
      </div>
      <div class="pie-chart" id="column12">
        <pie-chart></pie-chart>
      </div>
    </div>
    <div id="row2">
      <div id="column21" class="wrapper shadow" style="margin-top: 20px;width: 60vw;margin-bottom: 10px">
        <div class="chart">
          <h2 style="color: white">Another weird chart</h2>
          <chart v-if="loaded" :chart-data="chartdata"></chart>
        </div>
      </div>
      <div id="column22">
        <notes class="notes"></notes>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "./Chart.js";
import PieChart from "./PieChart.js";
import Notes from "./Notes";
//import gql from 'graphql-tag';
/*export const GET_DATA_SET = gql`
  query getData {
    datas(where: { is_public: { _eq: false} }, order_by: { created_at: desc }) {
      label
      data
  }
 }`;*/
export default {
  components: {
    Chart,
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
  },
  mounted() {}/*,
  apollo: {
      datas: {
        query: GET_DATA_SET,
        error(error) {
          this.error = JSON.stringify(error.message)
        }
      }
  }*/
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
  width: 300px;
  height: 320px;
  margin-left: 50px;
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
.notes {
  margin-left: 50px;
  width: 500px;
  margin-top: 20px;
  background-color: black;
  height: auto !important;
  padding: 15px;
  border-radius: 10px;
  box-sizing: content-box;
}
</style>