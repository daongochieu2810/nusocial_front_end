<template>
  <div :class="{history: !inHistory, 'history-in':inHistory}">
    <p v-if="!inHistory" class="heading">History</p>
    <transition @before-enter="enterStart" appear>
      <div>
        <div :class="{'row-in-history': inHistory, 'row-out': !inHistory,'top-gap': inHistory}">
          <div class="header" style="min-width: 102px">Date</div>
          <div class="header">Action Type</div>
          <div class="header">Details</div>
          <div v-if="inHistory" class="header"></div>
        </div>
      </div>
    </transition>
    <transition-group v-if="inHistory" @before-enter="enterStart" appear>
      <div v-for="id in history.keys()" :key="id" class="row-in-history" :class="{grey : id%2==0}">
        <div class="date">17/05/2020</div>
        <div class="action">Answered message</div>
        <div class="details">{{history[id].text}}</div>
        <b-button
          style="border-radius: 0px;background-color: #eb3434;border: #eb3434"
          :class="{diffRed: id%2!=0}"
          @click="deleteItem(history[id].id)"
        >Delete</b-button>
      </div>
    </transition-group>
    <perfect-scrollbar v-else>
      <div v-for="id in history.keys()" :key="id" class="row-out" :class="{grey : id%2==0}">
        <div class="date">17/05/2020</div>
        <div class="action">Answered message</div>
        <div class="details">{{history[id].text}}</div>
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
  props: {
    inHistory: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    for (let i = 0; i < 3; i++) {
      this.allItems.push({
        id: i,
        text:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum " (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
      });
      this.allItems.push({
        id: i + 3,
        text: "test"
      });
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
      console.log("deleted " + id);
      this.allItems = this.allItems.filter(item => item.id !== id);
      console.log(this.allItems.length);
    }
  }
};
</script>
<style scoped>
.heading {
  color: white;
  font-size: 30px;
  padding-left: 20px;
  padding-bottom: 10px;
  margin-top: 15px;
  border-bottom: 1px solid white;
  margin-bottom: 0;
}
.top-gap {
  margin-top: 10vh;
}
.history-in {
  margin-bottom: 20px;
  margin-left: 7vw;
}
.history {
  margin-left: 120px;
  margin-top: 80px;
  background-color: black;
  border-radius: 10px;
  border: 2px solid #dedede;
  width: 50%;
}
.row-in-history {
  background-color: black;
  width: 91vw;
  height: auto;
  margin-right: 3vw;
  border-left: 2px solid white;
  border-right: 2px solid white;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 3fr 10fr 1fr;
}
.row-out {
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
  border-right: 1px solid white;
}
.header {
  color: white;
  padding: 10px;
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
.ps {
  height: 50vh;
  width: auto;
}
</style>