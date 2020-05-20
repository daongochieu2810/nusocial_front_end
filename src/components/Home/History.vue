<template>
  <div class="history">
    <p style="color:white;font-size: 36px;margin-left: 20px;margin-top:15px">History</p>
    <transition @before-enter="enterStart" appear>
      <div>
        <div class="row">
          <div class="date" style="font-size: 25px;border-top: 1px solid white;min-width: 102px">Date</div>
          <div class="action" style="font-size: 25px;border-top: 1px solid white;">Action Type</div>
          <div class="details" style="font-size: 25px;border-top: 1px solid white;">Details</div>
        </div>
      </div>
    </transition>
       <perfect-scrollbar>
      <div v-for="id in history.keys()" :key="id" class="row" :class="{grey : id%2==0}">
        <div class="date">17/05/2020</div>
        <div class="action">Answered message</div>
        <div class="details">
          {{history[id].text}}
        </div>
      
      </div>
       </perfect-scrollbar>
    </div>
</template>
<script>
export default {
  data() {
    return {
      allItems: []
    };
  },
  mounted() {
    for (let i = 0; i < 3; i++) {
      this.allItems.push({
        id: i,
        text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum \" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
      });
      this.allItems.push({
      id: i+3,
      text: "test"
    })
    }
  },
  computed: {
    history() {
      return this.allItems;
    }
  },
  methods: {
    enterStart: function(el) {
      el.classList.add("testing-enter");
    },
    deleteItem(id) {
      console.log("deleted "+id)
      this.allItems = this.allItems.filter(item => item.id !== id);
      console.log(this.allItems.length)
    }
  }
};
</script>
<style scoped>
.history {
  margin-left: 120px;
  margin-top: 80px;
  background-color: black;
  border-radius: 10px;
  border: 2px solid #dedede;
  width: 50%;
}
.row {
  background-color: black;
  margin-left: 0px;
  margin-right: 0px;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 3fr 10fr;
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
.ps {
  height: 50vh;
  width: auto;
}
</style>