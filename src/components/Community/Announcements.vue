<template>
 <PostRelated :datePicker="datePicker" :wordEdit="wordEdit" :announcements="true">
   <template v-slot:title>{{title}}</template>
   <template v-slot:content>
    <div v-for="row in allRows" :key="row.id" class="row">
        <p class="timestamp">15/05/2020</p>
        <div class="container">
          <img
            src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-9/s960x960/78794853_2434835663499592_1312362149607112704_o.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=_4aBd_hMTBQAX_CGjB5&_nc_ht=scontent-xsp1-1.xx&_nc_tp=7&oh=a9e3f52490af5dfc6067038edb8de083&oe=5EE4C764"
            alt="Avatar"
          />
          <h4 style="color: white">Hieu</h4>
          <p
            style="color: white"
          >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
          <span class="time-right">11:00</span>
        </div>
        <p class="stats">1000/2000 read</p>
      </div>
   </template>
 </PostRelated>
</template>

<script>
import PostRelated from '../Common/PostRelated'
export default {
  components: {
    PostRelated
  },
  props: {
     datePicker: {
          type: Boolean,
          default: true
      },
      wordEdit: {
          type: Boolean,
          default: true
      },
      title: {
          type: String,
          default: "Announcements"
      }
  },
  data() {
    return {
      newAnnouncement: "",
      allRows: [],
      currDate: ""
    };
  },
  mounted() {
    for (let i = 0; i < 7; i++) {
      this.allRows.push({
        id: i
      });
    }
  },
  methods: {
    testMake() {
      console.log(this.newAnnouncement);
    },
    testDate() {
      console.log(this.currDate);
    }
  }
};
</script>
<style scoped>
/* Chat containers */
.container {
  border: 2px solid #dedede;
  background-color: black;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  margin-left: 50px;
}
.row {
  display: grid;
  grid-template-columns: 1fr 10fr 3fr;
  grid-template-rows: auto auto;
  margin-left: 10px;
}

.timestamp,
.stats {
  display: table-cell;
  margin: auto;
  color: white;
  text-align: center;
}
/* Clear floats */
.container::after {
  content: "";
  clear: both;
  display: table;
}

/* Style images */
.container img {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

/* Style time text */
.time-right {
  float: right;
  color: #aaa;
}



</style>