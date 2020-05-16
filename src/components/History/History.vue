<template>
<div style="margin-bottom: 20px">
<transition @before-enter="enterStart" appear>
    <div>
  <div class="head-row">
  <div class="header">Date</div>
  <div class="header">Action Type</div>
  <div class="header">Details</div>
   <div class="header"></div>
    </div>
    </div>
  </transition>
<transition-group @before-enter="enterStart" appear>
<div v-for="item in allItems" :key="item.id" class="row" :class="{grey : item.id%2==0}">
  <div class="date">17/05/2020</div>
  <div class="action">Answered message</div>
  <div class="details">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</div>
  <b-button style="border-radius: 0px;background-color: #eb3434;border: #eb3434" :class="{diffRed: item.id%2==0}">Delete</b-button>
</div>
</transition-group>
</div>
</template>
<script>
export default {
     data() {
      return {
        allItems: []
      }
    },
    mounted() {
        for(let i=0;i<7;i++) {
            this.allItems.push({
                id: i
            })
        }
    },
    methods: {
         enterStart: function(el) {
      el.classList.add("testing-enter");
         }
    }
}
</script>
<style scoped>
.head-row {
    background-color: black;
    width: 93vw;
    height: auto;
    margin-left: 6vw;
    margin-top: 7vh;
    border-left: 2px solid white;
    border-right: 2px solid white;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 1fr 3fr 10fr 1fr;  
    grid-template-rows: auto auto; 
}
.row {
    background-color: black;
    width: 93vw;
    height: auto;
    margin-left: 6vw;
    border-left: 2px solid white;
    border-right: 2px solid white;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 1fr 3fr 10fr 1fr;  
    grid-template-rows: auto auto; 
}
.date {
    color: white;
    padding: 10px;
    text-align: middle;
    border-left: 1px solid white;
    border-right: 1px solid white;
}
.action {
    color: white;
    padding: 10px;
    text-align: middle;
    border-right: 1px solid white;
}
.details {
    color: white;
    padding: 10px;
    text-align: middle;
    border-right: 1px solid white;
}
.header {
    color: white;
    padding: 10px;
    text-align: middle;
    border-right: 1px solid white;
    font-size: 25px;
}
.grey {
    background-color: grey;
}
.diffRed {
    background-color: #ff683b !important;
    border: #ff683b !important;
}
.testing-enter {
  animation: enter 0.5s;
}
@keyframes enter {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>