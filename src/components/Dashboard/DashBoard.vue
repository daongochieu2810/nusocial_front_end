<template>
  <div style="padding: 5px">
    <div id="row1">
      <div class="wrapper shadow" id="column11" style="width: 70vw">
        <div class="chart">
          <h2 style="color: white">Number of active members across all communities</h2>
          <Loading v-if="isLoading" style="margin-left: 45%;margin-top:15%" />
          <LineChart
            v-if="!isLoading"
            :chart-data="dataForMemOfComm.dataCollection"
            :options="dataForMemOfComm.options"
            @gradient="getGradient"
          ></LineChart>
        </div>
      </div>
      <div class="pie-chart" id="column12">
        <h5 style="color: white;margin-left: 20px;margin-top:10px">Distribution of types of posts</h5>
        <pie-chart
          style="margin-left: 1%;"
          @gradients="getGradients"
          :chart-data="dataForDoughNut.dataCollection"
          :options="dataForDoughNut.options"
        ></pie-chart>
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
          <Loading v-if="isLoading" style="margin-left: 45%;margin-top:15%" />
          <LineChart
            v-if="!isLoading"
            :chart-data="dataForPostOfComm.dataCollection"
            :options="dataForPostOfComm.options"
            @gradient="getGradient"
          ></LineChart>
        </div>
      </div>
      <div id="column22">
        <notes
          style="margin-top: 20px;margin-left: 30px"
          :sizes="{maxHeight: '43vh',
  width: 'auto'}"
          :inDashBoard="true"
          :notes="userProfile.notesForAdmin"
        ></notes>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../Common/Loading";
import LineChart from "../Common/ChartRelated/LineChart.js";
import PieChart from "../Common/ChartRelated/PieChart.js";
import Notes from "./Notes";
const fb = require("../../backend.js");
import { mapState } from "vuex";
export default {
  components: {
    LineChart,
    PieChart,
    Notes,
    Loading
  },
  watch: {
    allPosts: function() {
      var listOfNumOfPosts = this.dataForPostInComm.map(
        comm => comm.list.length
      );
      var labels = this.dataForPostInComm.map(comm => comm.name);
      this.dataForPostOfComm = this.prepData(
        "Number of Posts",
        listOfNumOfPosts,
        labels
      );
      var listOfTypesOfPosts = [0, 0, 0, 0, 0];
      for (let post of this.allPosts) {
        switch (post.postType) {
          case "Question": {
            listOfTypesOfPosts[0] += 1;
            break;
          }
          case "Sharing": {
            listOfTypesOfPosts[1] += 1;
            break;
          }
          case "Discussion": {
            listOfTypesOfPosts[2] += 1;
            break;
          }
          case "Poll": {
            listOfTypesOfPosts[3] += 1;
            break;
          }
          default: {
            listOfTypesOfPosts[4] += 1;
            break;
          }
        }
      }
      this.dataForDoughNut = this.prepDataForDoughnut(
        ["Question", "Sharing", "Discussion", "Poll", "Announcement"],
        listOfTypesOfPosts
      );
    },
    communities: function() {
      var dataForMemInComm = [];
      for (let comm of this.communities) {
        this.labelsForComm.push(comm.name);
        dataForMemInComm.push(comm.allMembersID.length);
        this.getPosts(comm.id).then(listOfPosts => {
          this.dataForPostInComm.push({ list: listOfPosts, name: comm.name });
          this.allPosts.push(...listOfPosts);
        });
      }
      this.dataForMemOfComm = this.prepData(
        "Number of Members",
        dataForMemInComm,
        this.labelsForComm
      );
    }
  },
  computed: {
    ...mapState(["userProfile", "communities"])
  },
  data() {
    return {
      dataForDoughNut: {},
      dataForPostOfComm: {},
      labelsForComm: [],
      dataForMemOfComm: {},
      dataForPostInComm: [],
      allPosts: [],
      gradient: null,
      isLoading: false,
      gradients: []
    };
  },
  mounted() {
    this.isLoading = true;
    this.$store.dispatch("fetchCommunities").then(() => {
      this.isLoading = false;
    });
  },
  methods: {
    getGradient(val) {
      this.gradient = val;
    },
    getGradients(val) {
      this.gradients = val;
    },
    prepData(label, data, labels) {
      var dataCollection = {
        labels: labels,
        datasets: [
          {
            label: label,
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: data
          }
        ]
      };
      var stepSize = Math.max.apply(Math, data) / 10;
      stepSize = Math.floor(stepSize);
      if (stepSize == 0) stepSize = 1;
      console.log(stepSize);
      var options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontColor: "white"
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "white",
                beginAtZero: true,
                stepSize: stepSize
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "white"
              }
            }
          ]
        }
      };
      return { dataCollection, options };
    },
    prepDataForDoughnut(labels, data) {
      var dataCollection = {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: labels,
        datasets: [
          {
            backgroundColor: this.gradients,
            data: data
          }
        ]
      };
      var options = {
        borderWidth: "10px",
        hoverBackgroundColor: "red",
        hoverBorderWidth: "10px",
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontColor: "white"
          }
        }
      };
      return { dataCollection, options };
    },
    async getPosts(commID) {
      var listOfPosts = [];
      this.isLoading = true;
      await fb.communityCollection
        .doc(commID)
        .collection("posts")
        .get()
        .then(res => {
          res.forEach(doc => listOfPosts.push(doc.data()));
          this.isLoading = false;
        });
      return listOfPosts;
    }
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