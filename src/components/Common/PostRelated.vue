<template>
  <div>
    <div :class="{'extra-padding': wordEdit,'announcements': announcements, 'posts':posts}">
      <div :class="{'headings-layout': datePicker}" class="headings">
        <p style="font-size: 25px">
          <slot name="title"></slot>
        </p>
        <div v-if="datePicker" id="datepicker" style="justify-self: end;padding: 10px">
          <b-form-datepicker v-model="currDate" @hidden="updateDate"></b-form-datepicker>
        </div>
        <div v-if="datePicker" style="justify-self: end;padding: 10px">
          <b-button variant="outline-primary" @click="chooseToday">Today</b-button>
        </div>
      </div>
      <!--Content section -->
      <slot name="content"></slot>
    </div>
    <div v-if="wordEdit" class="word-editor">
      <p style="font-size: 25px">New announcement</p>
      <quill-editor
        ref="quillEditor"
        v-model="newAnnouncement"
        :options="editorOption"
        @change="onEditorChange($event)"
      />
      <b-form-file
        style="margin-top: 10px"
        multiple
        v-model="files"
        :state="Boolean(files.length > 0)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
      <b-button variant="outline-primary" style="margin-top: 10px" @click="donePost">Done</b-button>
    </div>
  </div>
</template>

<script>
const fb = require("../../backend.js");
export default {
  components: {},
  props: {
    datePicker: {
      type: Boolean,
      default: false
    },
    wordEdit: {
      type: Boolean,
      default: false
    },
    commData: {
      type: Object,
      default: () => {}
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
      files: [],
      newPostID: "",
      newAnnouncement: "",
      textNew: "",
      allRows: [],
      imageList: [],
      fileList: [],
      listOfUrls: [],
      currDate: "",
      editorOption: {
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ["clean"],
              ["image"]
            ]
          }
        }
      }
    };
  },
  mounted() {
    for (let i = 0; i < 7; i++) {
      this.allRows.push({
        id: i
      });
    }
  },
  watch: {
    newPostID: function() {
      if (this.newPostID != "") {
        this.uploadToStorage(this.listOfUrls).then(() => {
          this.uploadFiles(this.files);
        });
      }
    },
    imageList: function() {
      if (this.imageList.length > 0) {
        this.updateImage();
      }
    },
    fileList: function() {
      if (this.fileList.length > 0) {
        this.updateFiles();
      }
    }
  },
  methods: {
    async uploadToStorage(dataUrls) {
      var storageRef = fb.storage.ref();
      for (let i = 0; i < dataUrls.length; i++) {
        var url = dataUrls[i];
        var imageRef = storageRef.child(
          "/post_images/" + this.newPostID + i.toString()
        );
        let file = url.split(",")[1];
        var uploadTask = imageRef.putString(file, "base64", {
          contentType: "image/jpg"
        });
        uploadTask.on(
          fb.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case fb.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case fb.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
            }
          },
          error => {
            console.log(error);
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.imageList.push(downloadURL);
            });
          }
        );

        //storageRef.putString(file, 'base64')
      }
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      //this.uploadToStorage(listOfUrls)
      this.textNew = text;
    },
    testMake() {
      console.log(this.newAnnouncement);
    },
    updateDate() {
      this.$emit("updateDate", this.currDate);
    },
    chooseToday() {
      this.$emit("todayChosen");
    },
    async uploadFiles() {
      var storageRef = fb.storage.ref();
      for (let index in this.files) {
        let file = this.files[index];
        let fileRef = storageRef.child(
          "/post_files/" + this.newPostID + "/" + file.name
        );
        //let file = url.split(",")[1];
        let uploadTask = fileRef.put(file);
        uploadTask.on(
          fb.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case fb.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case fb.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
            }
          },
          error => {
            console.log(error);
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.fileList.push(downloadURL);
            });
          }
        );
      }
    },
    donePost() {
      var doc = new DOMParser().parseFromString(
        this.newAnnouncement,
        "text/xml"
      );
      var allImgElements = doc.getElementsByTagName("img");
      //var listOfUrls = []
      for (let element of allImgElements) {
        var url = element.attributes[0].value;
        this.listOfUrls.push(url);
      }
      this.publishPost();
    },
    async updateImage() {
      //console.log(this.imageList);
      await fb.communityCollection
        .doc(this.commData.id)
        .collection("posts")
        .doc(this.newPostID)
        .update({
          imageList: this.imageList
        })
        .then(() => {
          this.imageList = [];
          //this.newPostID = "";
          this.listOfUrls = [];
          this.textNew = "";
          this.newAnnouncement = "<p></p>";
        });
    },
    async updateFiles() {
      await fb.communityCollection
        .doc(this.commData.id)
        .collection("posts")
        .doc(this.newPostID)
        .update({
          videoList: this.fileList
        })
        .then(() => {
          //this.imageList = [];
          //this.newPostID = "";
          //this.listOfUrls = [];
          this.textNew = "";
          this.newAnnouncement = "<p></p>";
          this.files = [];
          this.fileList = [];
        });
    },
    async publishPost() {
      this.newPostID = "";
      await fb.communityCollection
        .doc(this.commData.id)
        .collection("posts")
        .add({
          communityID: this.commData.id,
          id: "",
          imageList: [],
          ownerUid: this.$store.state.userProfile.uid,
          parentCommName: this.commData.name,
          postType: "Announcement",
          textContent: this.textNew,
          timeStamp: new Date(),
          userLikeList: [],
          videoList: []
        })
        .then(docRef => {
          docRef.update({ id: docRef.id }).then(() => {
            this.newPostID = docRef.id;
            console.log("id is " + this.newPostID);
          });
        });
    }
  }
};
</script>
<style scoped>
.extra-padding {
  padding-bottom: 100px !important;
}
.announcements {
  width: 91.6vw;
  margin-left: 7vw;
  margin-top: 30px;
  background-color: black;
  border-radius: 10px;
  border: 2px solid #dedede;
  padding: 5px;
  margin-right: 20px;
  padding-right: 20px;
}
.posts {
  margin-top: 80px;
  background-color: black;
  border-radius: 10px;
  border: 2px solid #dedede;
  padding: 5px;
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