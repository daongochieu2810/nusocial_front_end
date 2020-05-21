<template>
  <div class="notes">
    <p class="text">Notes</p>
    <perfect-scrollbar>
      <b-form-checkbox
        v-for="note in allNotes"
        :key="note.id"
        v-model="note.status"
        value="accepted"
        unchecked-value="not_accepted"
        @change="test_change(note.id)"
      >
        <p class="text">Note {{note.id}}</p>
      </b-form-checkbox>
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
  mounted() {
    for (let i = 0; i < 40; i++) {
      this.allNotes.push({
        status: "not_accepted",
        id: i
      });
    }
  },
  methods: {
    test_change(id) {
      console.log(id + "changes");
    }
  }
};
</script>
<style scoped>
.text {
  color: white;
}
.notes {
  width: 500px;
  background-color: black;
  height: auto !important;
  padding: 15px;
  border-radius: 10px;
  box-sizing: content-box;
}
.ps {
  max-height: 50vh;
  width: auto;
}
</style>