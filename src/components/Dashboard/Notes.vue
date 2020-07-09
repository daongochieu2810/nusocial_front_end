<template>
  <div style="border-radius: 10px;">
    <div class="notes">
      <p class="text">Notes</p>
      <Loading v-if="isLoading" style="margin-left: 18vw" />
      <perfect-scrollbar :style="sizes" v-if="!isLoading">
        <div v-for="note in allNotes" :key="note.id" :class="{layouts:inDashBoard}">
          <b-form-checkbox
            style="margin-right: 10px"
            v-model="note.status"
            value="accepted"
            unchecked-value="not_accepted"
            @change="change(note.id, note.note)"
          >
            <p style="color: white">{{note.note}}</p>
          </b-form-checkbox>
          <div v-if="inDashBoard" style="margin-left:5px;align-self:center">
            <b-button variant="outline-danger" @click="deleteItem(note.note, note.id)">Delete</b-button>
          </div>
        </div>
      </perfect-scrollbar>
    </div>
    <div v-if="wordEdit" class="word-editor">
      <p style="font-size: 25px">New note</p>
      <b-form-input v-model="newNote" placeholder="Enter new notes"></b-form-input>
      <b-button variant="outline-primary" style="margin-top: 10px" @click="makeNote">Done</b-button>
    </div>
  </div>
</template>

<script>
import Loading from "../Common/Loading";
const fb = require("../../backend.js");
import { mapState } from "vuex";
import firebase from "firebase";
export default {
  components: {
    Loading
  },
  computed: {
    ...mapState(["userProfile"])
  },
  data() {
    return {
      allNotes: [],
      newNote: "",
      isLoading: false
    };
  },
  props: {
    sizes: Object,
    inDashBoard: Boolean,
    wordEdit: {
      type: Boolean,
      default: true
    },
    notes: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    userProfile: function() {
      this.notes = this.userProfile.notesForAdmin;
      this.allNotes = [];
      for (let key in this.notes) {
        var note = this.notes[key];
        this.allNotes.push({
          id: key,
          note: note.first,
          isChecked: note.second,
          status: note.second == "false" ? "not_accepted" : "accepted"
        });
      }
    }
  },
  mounted() {
    //console.log(this.notes);
    this.notes = this.userProfile.notesForAdmin;
    for (let key in this.notes) {
      var note = this.notes[key];
      this.allNotes.push({
        id: key,
        note: note.first,
        isChecked: note.second,
        status: note.second == "false" ? "not_accepted" : "accepted"
      });
    }
  },
  methods: {
    change(id, note) {
      this.toggleNode(note).then(() => {
        this.allNotes[id].status =
          this.allNotes[id].status != "not_accepted"
            ? "not_accepted"
            : "accepted";
      });
    },
    async toggleNode(noteToToggle) {
      this.isLoading = true;
      await fb.userCollection
        .doc(this.userProfile.uid)
        .update({
          notesForAdmin: this.userProfile.notesForAdmin.map(note => {
            if (note.first == noteToToggle) {
              if (note.second == "true") note.second = "false";
              else note.second = "true";
            }
            return note;
          })
        })
        .then(() => {
          this.isLoading = false;
        });
    },
    makeNote() {
      this.sendNote(this.newNote).then(() => {
        var index = this.allNotes.length;
        this.allNotes.push({
          id: index,
          note: this.newNote,
          isChecked: "false",
          status: "not_accepted"
        });
        this.newNote = "";
      });
    },
    async sendNote(note) {
      this.isLoading = true;
      await fb.userCollection
        .doc(this.userProfile.uid)
        .update({
          notesForAdmin: firebase.firestore.FieldValue.arrayUnion({
            first: note,
            second: "false"
          })
        })
        .then(() => {
          this.isLoading = false;
        });
    },
    deleteItem(note, id) {
      //this.allNotes = this.allNotes.filter(item => item.id !== id);
      this.updateNote(note).then(() => {
        this.allNotes = this.allNotes.filter(item => item.id !== id);
      });
    },
    async updateNote(noteToDelete) {
      this.isLoading = true;
      await fb.userCollection
        .doc(this.userProfile.uid)
        .update({
          notesForAdmin: this.userProfile.notesForAdmin.filter(
            note => note.first != noteToDelete
          )
        })
        .then(() => {
          this.isLoading = false;
        });
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
  height: auto;
  margin-left: 30px;
  margin-top: -25px;
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