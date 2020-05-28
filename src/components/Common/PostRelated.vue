<template>
  <div>
    <div :class="{'extra-padding': wordEdit,'announcements': announcements, 'posts':posts}">
      <div :class="{'headings-layout': datePicker}" class="headings">
        <p style="font-size: 30px">
          <slot name="title"></slot>
        </p>
        <div v-if="datePicker" id="datepicker" style="justify-self: end;padding: 10px">
          <b-form-datepicker v-model="currDate" @hidden="testDate"></b-form-datepicker>
        </div>
        <div v-if="datePicker" style="justify-self: end;padding: 10px">
          <b-button variant="outline-primary">Today</b-button>
        </div>
      </div>
      <!--Content section -->
      <slot name="content"></slot>
    </div>
    <div v-if="wordEdit" class="word-editor">
      <p style="font-size: 25px">New announcement</p>
      <wysiwyg v-model="newAnnouncement" />
      <b-button variant="outline-primary" style="margin-top: 10px" @click="testMake">Done</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    datePicker: {
      type: Boolean,
      default: false
    },
    wordEdit: {
      type: Boolean,
      default: false
    },
    announcements: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newAnnouncement: "",
      allRows: [],
      currDate: ""
    };
  },
  mounted() {
    for (let i = 0; i < 7; i++) {
      this.allRows.push({
        id: i
      });
    }
  },
  methods: {
    testMake() {
      console.log(this.newAnnouncement);
    },
    testDate() {
      console.log(this.currDate);
    }
  }
};
</script>
<style scoped>
.extra-padding {
  padding-bottom: 100px !important;
}
.announcements {
  margin-left: 120px;
  margin-top: 50px;
  background-color: black;
  border-radius: 10px;
  border: 2px solid #dedede;
  padding: 5px;
  margin-right: 20px;
  padding-right: 20px;
}
.posts {
  margin-left: 120px;
  margin-top: 80px;
  background-color: black;
  border-radius: 10px;
  border: 2px solid #dedede;
  padding: 5px;
  width: 49.5vw;
  padding-right: 20px;
}
/* Chat containers */
.container {
  border: 2px solid #dedede;
  background-color: black;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  margin-left: 50px;
}
.row-3 {
  display: grid;
  grid-template-columns: 1fr 10fr 3fr;
  grid-template-rows: auto auto;
  margin-left: 10px;
}
.row-2 {
  display: grid;
  grid-template-columns: 1fr 10fr;
  grid-template-rows: auto auto;
  margin-left: 10px;
}
.row-1 {
  display: grid;
  grid-template-columns: 1fr 10fr 3fr;
  grid-template-rows: auto auto;
  margin-left: 10px;
}
.timestamp,
.stats {
  display: table-cell;
  margin: auto;
  color: white;
  text-align: center;
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

/* Style time text */
.time-right {
  float: right;
  color: #aaa;
}
.headings {
  color: white;
  padding: 10px;
}
.headings-layout {
  display: grid;
  grid-template-columns: 3fr 11fr 1fr;
  grid-template-rows: auto auto;
}
.word-editor {
  width: 70vw;
  margin-left: 200px;
  margin-top: -80px;
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