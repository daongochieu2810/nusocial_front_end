<template>
  <div>
    <transition-group @before-enter="enterStart" appear>
      <b-card-group deck v-for="row in allRows" :key="row.id" class="custom-row">
        <router-link to="/community1" v-for="card in row.allCards" :key="card.id" class="mb-2">
          <b-card
            title="CS3233"
            img-src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/Competitive-Programming.jpg"
            img-alt="Image"
            img-top
            tag="article"
            class="custom-card"
          >
            <b-card-text>Best of best Best of best Best</b-card-text>
          </b-card>
        </router-link>
      </b-card-group>
    </transition-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allCards: [],
      allRows: []
    };
  },
  mounted() {
    for (let i = 0; i < 5; i++) {
      this.allCards.push({
        id: i
      });
    }
    this.allRows.push({
      allCards: this.allCards,
      id: 0
    });
    this.allRows.push({
      allCards: this.allCards,
      id: 1
    });
    this.allRows.push({
      allCards: this.allCards,
      id: 2
    });
  },
  methods: {
    enterStart: function(el) {
      el.classList.add("testing-enter");
    }
  }
};
</script>
<style scoped>
.custom-card {
  width: 15vw;
  height: auto;
  background-color: black;
  color: white;
  transition: transform 0.2s;
  z-index: 0;
  border-color: white;
}
.custom-card:hover {
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transform: scale(1.2);
  z-index: 1;
}
.custom-row {
  margin-top: 80px;
  margin-left: 120px;
  margin-right: 50px;
}
.custom-button {
  padding: 0;
  width: 100px;
  height: 30px;
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
}
.text {
  margin-bottom: 0;
  margin-top: 2px;
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