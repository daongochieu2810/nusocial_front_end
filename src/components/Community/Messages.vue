<template>
<div class="messages">
  <div class="headings">
<p>Messages</p>
 <p style="float: right"><b-button variant="outline-primary">Today</b-button></p>
 <p style="float: right"><b-button variant="outline-success">Last week</b-button></p>
</div>
 <div class="container">
  <img src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-9/s960x960/78794853_2434835663499592_1312362149607112704_o.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=_4aBd_hMTBQAX_CGjB5&_nc_ht=scontent-xsp1-1.xx&_nc_tp=7&oh=a9e3f52490af5dfc6067038edb8de083&oe=5EE4C764" alt="Avatar">
  <p style="color: white">Hello Hello</p>
  <span class="time-right">11:00</span>
</div>

<div class="container">
  <img src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-9/s960x960/78794853_2434835663499592_1312362149607112704_o.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=_4aBd_hMTBQAX_CGjB5&_nc_ht=scontent-xsp1-1.xx&_nc_tp=7&oh=a9e3f52490af5dfc6067038edb8de083&oe=5EE4C764" alt="Avatar">
  <p style="color: white">HieuGod is here HAHAHAHAHHAHHA AHAHAHAHAHAHHAHAHAHAHAHHAHAHHAHAHAHAHAHAH</p>
  <span class="time-right">11:02</span>
</div>
<div class="container">
  <img src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-9/s960x960/78794853_2434835663499592_1312362149607112704_o.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=_4aBd_hMTBQAX_CGjB5&_nc_ht=scontent-xsp1-1.xx&_nc_tp=7&oh=a9e3f52490af5dfc6067038edb8de083&oe=5EE4C764" alt="Avatar">
  <p style="color: white">Nice </p>
  <span class="time-right">11:02</span>
</div>
<div class="container">
  <img src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-9/s960x960/78794853_2434835663499592_1312362149607112704_o.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=_4aBd_hMTBQAX_CGjB5&_nc_ht=scontent-xsp1-1.xx&_nc_tp=7&oh=a9e3f52490af5dfc6067038edb8de083&oe=5EE4C764" alt="Avatar">
  <p style="color: white">Earth can be saved at last</p>
  <span class="time-right">11:02</span>
</div>
</div>
</template>

<script>
  export default {
    data() {
      return {
       
      }
    }
  }
</script>
<style scoped>
.messages {
    margin-left: 120px;
    margin-top: 80px;
    background-color: black;
    border-radius: 10px;
    border: 2px solid #dedede;
    padding: 5px;
    width: 40%;
    padding-right: 20px;
}
/* Chat containers */
.container {
  border: 2px solid #dedede;
  background-color: black;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  margin-left: 5px;
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

/* Style the right image */
.container img.right {
  float: right;
  margin-left: 20px;
  margin-right:0;
}

/* Style time text */
.time-right {
  float: right;
  color: #aaa;
}

/* Style time text */
.time-left {
  float: left;
  color: #999;
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