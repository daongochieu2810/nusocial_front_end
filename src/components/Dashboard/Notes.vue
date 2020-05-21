<template>
  <div class="notes">
    <p class="text">Notes</p>
    <perfect-scrollbar :style="sizes">
      <div v-for="note in notes"
        :key="note.id" :class="{layouts:inDashBoard}">
      <b-form-checkbox
        style="margin-right: 10px"
        v-model="note.status"
        value="accepted"
        unchecked-value="not_accepted"
        @change="test_change(note.id)"
      >
        <p class="text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
      </b-form-checkbox>
      <div v-if="inDashBoard" style="margin-left:5px;align-self:center">
       <b-button variant="outline-danger" @click="deleteItem(note.id)">Delete</b-button>
      </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allNotes: []
    };
  },
  props: {
    sizes: Object,
    inDashBoard: Boolean
  },
  mounted() {
    for (let i = 0; i < 5; i++) {
      this.allNotes.push({
        status: "not_accepted",
        id: i
      });
    }
  },
  computed: {
    notes() {
      return this.allNotes
    }
  },
  methods: {
    test_change(id) {
      console.log(id + "changes");
    },
    deleteItem(id) {
      this.allNotes = this.allNotes.filter(item => item.id !== id)
    }
  }
};
</script>
<style scoped>
.text {
  color: white;
}
.notes {
  width: 40vw;
  margin-right: 30px;
  background-color: black;
  height: auto !important;
  padding: 15px;
  padding-right: 20px;
  border-radius: 10px;
  box-sizing: content-box;
}
.layouts {
  display: grid;
  grid-template-columns: 10fr 1fr;
}
</style>