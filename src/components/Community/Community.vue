<template>
  <div>
    <transition-group @before-enter="enterStart" appear>
      <b-card-group columns class="custom-row" key="grid">
        <router-link
          v-for="card in allCards"
          :key="card.id"
          class="mb-2"
          :to="getLinkToSingleComm(card.data.id)"
        >
          <b-card no-body tag="article" class="custom-card">
            <b-card-img
              :src="card.data.coverImageUrl"
              alt="Image"
              class="rounded-0"
              style="height:150px; object-fit: cover; 
  object-position: center; "
            ></b-card-img>
            <perfect-scrollbar class="sizes">
              <b-card-title
                style="margin-left: 20px;margin-right:20px;margin-top: 5px"
              >{{card.data.name}}</b-card-title>
              <b-card-text style="margin-left: 20px;margin-right:20px">{{card.data.about}}</b-card-text>
            </perfect-scrollbar>
          </b-card>
        </router-link>
      </b-card-group>
    </transition-group>
  </div>
</template>
<script>
//const fb = require("../../backend.js");
import { mapState } from "vuex";
export default {
  data() {
    return {
      allCards: [],
      communitiesAfter: []
    };
  },
  computed: {
    ...mapState(["userProfile", "communities"])
  },
  watch: {
    communitiesAfter: function() {
      try {
        this.populateData();
      } catch (e) {
        console.log(e);
      }
    },
    communities(newData, oldData) {
      console.log(oldData);
      this.communitiesAfter = newData.filter(comm => this.checkIsAdmin(comm));
    }
  },
  mounted() {
    this.$store.dispatch("fetchCommunities");
  },
  methods: {
    checkIsAdmin(comm) {
      for (let i = 0; i < comm.allAdminsID.length; i++) {
        console.log(this.userProfile.uid + "   " + comm.allAdminsID[i]);
        if (comm.allAdminsID[i] === this.userProfile.uid) return true;
      }
      return false;
    },
    getLinkToSingleComm(commID) {
      return "/community/" + commID;
    },
    enterStart: function(el) {
      el.classList.add("testing-enter");
    },
    populateData() {
      for (let comm of this.communitiesAfter) {
        this.allCards.push({
          communityID: comm.id,
          data: comm,
          id: comm.id
        });
      }
    }
  }
};
</script>
<style scoped>
.custom-card {
  height: 40vh;
  background-color: black;
  color: white;
  transition: transform 0.2s;
  z-index: 0;
  border-color: white;
}
.sizes {
  width: auto;
  height: 15vh;
}
.custom-card:hover {
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transform: scale(1.1);
  z-index: 1;
}
.custom-row {
  margin-top: 80px;
  margin-left: 120px;
  margin-right: 50px;
  display: grid;
  grid-template-columns: 5fr 5fr 5fr 5fr 5fr;
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