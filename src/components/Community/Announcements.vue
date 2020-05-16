<template>
<div>
<div class="announcements">
  <div class="headings">
<p>Announcements</p>
 <p style="float: right"><b-button variant="outline-primary">Today</b-button></p>
 <p style="float: right"><b-button variant="outline-success">Last week</b-button></p>
</div>


<div class="row" v-for="row in allRows" :key="row.id">
<p class="timestamp">15/05/2020</p>
 <div class="container">
  <img src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-9/s960x960/78794853_2434835663499592_1312362149607112704_o.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=_4aBd_hMTBQAX_CGjB5&_nc_ht=scontent-xsp1-1.xx&_nc_tp=7&oh=a9e3f52490af5dfc6067038edb8de083&oe=5EE4C764" alt="Avatar">
  <h4 style="color: white">HieuGod</h4>
  <p style="color: white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

</p>
  <span class="time-right">11:00</span>
</div>
<p class="stats">1000/2000 read</p>
</div>
</div>
<div class="word-editor">
<p style="font-size: 25px">New announcement</p>
<wysiwyg v-model="newAnnouncement"/>
 <b-button variant="outline-primary" style="margin-top: 10px" @click="testMake">Done</b-button>
</div>
</div>
</template>

<script>

  export default {
    components: {
        
    },
    data() {
      return {
          newAnnouncement: '',
          allRows: []
      }
    },
    mounted() {
        for(let i=0;i<7;i++) {
            this.allRows.push({
                id: i
            })
        }
    },
    methods: {
      testMake() {
        console.log(this.newAnnouncement);
      }
    }
  }
</script>
<style scoped>
.announcements {
    margin-left: 120px;
    margin-top: 50px;
    background-color: black;
    border-radius: 10px;
    border: 2px solid #dedede;
    padding: 5px;
    width: 93%;
    padding-right: 20px;
    padding-bottom: 100px;

}
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
    grid-template-columns: 1fr 10fr 3fr 2fr;  
    grid-template-rows: auto auto;  
    margin-left: 10px;
}
.timestamp, .stats {
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
.word-editor {
    width: 70vw;
    margin-left: 200px;
    margin-top: -80px;
    border-radius: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    color: black;
    border: 5px black;
    padding: 10px;
    margin-bottom: 10px;
}
</style>