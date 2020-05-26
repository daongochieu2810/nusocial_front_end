<template>
  <div style="border-radius: 10px;">
    <div class="notes">
      <p class="text">Notes</p>
      <perfect-scrollbar :style="sizes">
        <div v-for="note in notes" :key="note.id" :class="{layouts:inDashBoard}">
          <b-form-checkbox
            style="margin-right: 10px"
            v-model="note.status"
            value="accepted"
            unchecked-value="not_accepted"
            @change="test_change(note.id)"
          >
            <p style="color: white"
            >There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
          </b-form-checkbox>
          <div v-if="inDashBoard" style="margin-left:5px;align-self:center">
            <b-button variant="outline-danger" @click="deleteItem(note.id)">Delete</b-button>
          </div>
        </div>
      </perfect-scrollbar>
    </div>
    <div v-if="wordEdit" class="word-editor">
      <p style="font-size: 25px">New note</p>
      <wysiwyg v-model="newNote" style="height:10vh" />
      <b-button variant="outline-primary" style="margin-top: 10px" @click="testMake">Done</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allNotes: [],
      newNote: ""
    };
  },
  props: {
    sizes: Object,
    inDashBoard: Boolean,
    wordEdit: {
      type: Boolean,
      default: true
    }
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
      return this.allNotes;
    }
  },
  methods: {
    test_change(id) {
      console.log(id + "changes");
    },
    deleteItem(id) {
      this.allNotes = this.allNotes.filter(item => item.id !== id);
    }
  }
};
</script>
<style scoped>
.text {
  color: white;
  font-size: 30px;
}
.notes {
  width: 40vw;
  background-color: black;
  height: auto !important;
  padding: 15px;
  padding-right: 20px;
  border-radius: 10px;
  box-sizing: content-box;
  padding-bottom: 50px;
}
.layouts {
  display: grid;
  grid-template-columns: 10fr 1fr;
}
.word-editor {
  width: 35vw;
  margin-left: 30px;
  margin-top: -50px;
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