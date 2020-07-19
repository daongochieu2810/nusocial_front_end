<template>
  <div>
    <beautiful-chat
      :id="id"
      :dist="dist"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :close="closeChat"
      :colors="colors"
      :isOpen="isOpen"
      :messageList="messageList"
      :messageStyling="messageStyling"
      :newMessagesCount="newMessagesCount"
      :onMessageWasSent="onMessageWasSent"
      :open="openChat"
      :participants="participants"
      :showCloseButton="true"
      :showLauncher="!isOpen && clicked"
      :showEmoji="true"
      :showFile="true"
      :showTypingIndicator="showTypingIndicator"
      :titleImageUrl="titleImageUrl"
      @onType="handleOnType"
      @edit="editMessage"
      @remove="removeMessage"
    >
      <template v-slot:text-message-toolbox="scopedProps">
        <button
          v-if="!scopedProps.me && scopedProps.message.type==='text'"
          @click.prevent="like(scopedProps.message.id)"
        >👍</button>
      </template>
      <template v-slot:text-message-body="scopedProps">
        <p class="sc-message--text-content" v-html="scopedProps.messageText"></p>
        <p
          v-if="scopedProps.message.data.meta"
          class="sc-message--meta"
          :style="{color: scopedProps.messageColors.color}"
        >{{scopedProps.message.data.meta}}</p>
        <p
          v-if="scopedProps.message.isEdited || scopedProps.message.liked"
          class="sc-message--edited"
        >
          <template v-if="scopedProps.message.isEdited">✎</template>
          <template v-if="scopedProps.message.liked">👍</template>
        </p>
      </template>
    </beautiful-chat>
    <v-dialog />
  </div>
</template>

<script>
import availableColors from "./colors";
//import { v4 as uuidv4 } from 'uuid';
const fb = require("../../backend.js");
import { mapState } from "vuex";
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    dist: {
      type: String,
      default: "25px"
    },
    isOpen: {
      type: Boolean
    },
    id: {
      type: String
    },
    clicked: {
      type: Boolean
    }
  },
  data() {
    return {
      participants: [],
      titleImageUrl: "",
      messageList: [],
      rawMessageData: [],
      newMessagesCount: 0,
      numberOfMsgs: 0,
      isChatOpen: false,
      showTypingIndicator: "",
      colors: {
        header: {
          bg: "black",
          text: "#fcfcfc"
        },
        launcher: {
          bg: "black"
        },
        messageList: {
          bg: "#ffffff"
        },
        sentMessage: {
          bg: "black",
          text: "#ffffff"
        },
        receivedMessage: {
          bg: "grey",
          text: "#ffffff"
        },
        userInput: {
          bg: "black",
          text: "white"
        }
      },
      availableColors,
      chosenColor: null,
      alwaysScrollToBottom: true,
      messageStyling: true,
      userIsTyping: false
    };
  },
  watch: {
    participants: function() {
      console.log(this.participants);
      if (this.participants.length == 1) {
        this.titleImageUrl = this.participants[0].profilePicturePath;
      }
      this.$emit("provideCoverImageChat", {
        image: this.titleImageUrl,
        id: this.id
      });
    },
    rawMessageData: function() {
      var oldLength = this.numberOfMsgs;
      this.numberOfMsgs = this.rawMessageData.length;
      for (let i = oldLength; i < this.rawMessageData.length; i++) {
        var msg = this.rawMessageData[i];
        this.messageList.push({
          author:
            msg.sender == this.userProfile.uid
              ? { name: "me", uid: this.userProfile.uid }
              : { name: msg.senderName, uid: msg.sender },
          type: this.getType(msg.messageType),
          id: i,
          data: { text: msg.messageText, file: msg.fileName || "" }
        });
      }
    }
  },
  mounted() {
    this.$store.commit("toggleClickedFalse", this.id);
    console.log(this.isOpen);
    console.log(this.clicked);
    var listOfID = [];
    for (let user of this.data.recipients) {
      if (user.first !== this.userProfile.uid) listOfID.push(user.first);
    }
    if (listOfID.length == 0) {
      this.titleImageUrl = this.userProfile.profilePicturePath;
      this.$emit("provideCoverImageChat", {
        image: this.titleImageUrl,
        id: this.id
      });
    }
    console.log(listOfID);
    console.log(this.participants);
    //this.participants = []
    this.getParticipants(listOfID);
    this.fetchMessages();
  },
  methods: {
    getType(type) {
      switch (type) {
        case "IMAGE":
          return "file";
        case "FILE":
          return "file";
        case "SYSTEM":
          return "system";
        default:
          return "text";
      }
    },
    async getParticipants(listOfID) {
      await fb.userCollection.where("uid", "in", listOfID).onSnapshot(res => {
        res.docChanges().forEach(change => {
          if (change.type == "added") {
            var doc = change.doc;
            this.participants.push(doc.data());
          }
        });
      });
    },
    async fetchMessages() {
      await fb.messagesChannelCollection
        .doc(this.id)
        .collection("messages")
        .orderBy("timestamp")
        .onSnapshot(res => {
          res.docChanges().forEach(change => {
            if (change.type == "added") {
              let doc = change.doc;
              this.rawMessageData.push(doc.data());
            }
          });
        });
    },
    async addMsgToFirebase(text) {
      console.log("here");
      await fb.messagesChannelCollection
        .doc(this.id)
        .collection("messages")
        .add({
          messageText: text,
          messageType: "TEXT",
          fileName: "",
          receiver:
            this.participants.length == 1
              ? this.participants[0].uid
              : this.userProfile.uid,
          sender: this.userProfile.uid,
          senderName: this.userProfile.name,
          timestamp: new Date()
        })
        .then(() => {
          fb.messagesChannelCollection.doc(this.id).update({
            latestMessage: text,
            latestTime: new Date()
          });
        });
    },
    handleTyping(text) {
      this.showTypingIndicator =
        text.length > 0
          ? this.participants[this.participants.length - 1].id
          : "";
    },
    onMessageWasSent(message) {
      if (!message.data.file) this.addMsgToFirebase(message.data.text);
      else {
        this.addFileMessage(message.data.file);
        if (message.data.text && message.data.text != "")
          this.addMsgToFirebase(message.data.text);
      }
    },
    async addFileMessage(file) {
      var storageRef = fb.storage.ref();
      var fileRef = storageRef.child(
        "/message_files/" + this.id + "/" + file.name
      );
      //let file = url.split(",")[1];
      var uploadTask = fileRef.put(file);
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
            fb.messagesChannelCollection
              .doc(this.id)
              .collection("messages")
              .add({
                messageText: downloadURL,
                messageType: "FILE",
                fileName: file.name,
                receiver:
                  this.participants.length == 1
                    ? this.participants[0].uid
                    : this.userProfile.uid,
                sender: this.userProfile.uid,
                senderName: this.userProfile.name,
                timestamp: new Date()
              })
              .then(() => {
                fb.messagesChannelCollection.doc(this.id).update({
                  latestMessage: "File sent",
                  latestTime: new Date()
                });
              });
          });
        }
      );
    },
    openChat() {
      this.$store.commit("changeBoxTrue", this.id);
      this.newMessagesCount = 0;
      console.log(this.isOpen);
      console.log(this.clicked);
      console.log("testopen");
    },
    closeChat() {
      this.$store.commit("toggleClickedTrue", this.id);
      this.$store.commit("changeBoxFalse", this.id);
      //console.log("testclose");
    },
    setColor(color) {
      this.colors = this.availableColors[color];
      this.chosenColor = color;
    },
    showStylingInfo() {
      this.$modal.show("dialog", {
        title: "Info",
        text:
          "You can use *word* to <strong>boldify</strong>, /word/ to <em>emphasize</em>, _word_ to <u>underline</u>, `code` to <code>write = code;</code>, ~this~ to <del>delete</del> and ^sup^ or ¡sub¡ to write <sup>sup</sup> and <sub>sub</sub>"
      });
    },
    messageStylingToggled(e) {
      this.messageStyling = e.target.checked;
    },
    handleOnType(id) {
      this.$root.$emit("onType", id);
      this.userIsTyping = true;
    },
    editMessage(message) {
      const m = this.messageList.find(m => m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    },
    removeMessage(message) {
      if (confirm("Delete?")) {
        const m = this.messageList.find(m => m.id === message.id);
        m.type = "system";
        m.data.text = "This message has been removed";
      }
    },
    like(id) {
      const m = this.messageList.findIndex(m => m.id === id);
      var msg = this.messageList[m];
      msg.liked = !msg.liked;
      this.$set(this.messageList, m, msg);
    }
  },
  computed: {
    ...mapState(["all_message_channels", "chatbox", "userProfile"]),
    linkColor() {
      return this.chosenColor === "dark"
        ? this.colors.sentMessage.text
        : this.colors.launcher.bg;
    },
    backgroundColor() {
      return this.chosenColor === "dark" ? this.colors.messageList.bg : "#fff";
    },
    chats() {
      return this.allChatWindows;
    }
  }
};
</script>

<style>
.text-center {
  text-align: center;
}

.colors a {
  color: #fff;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 10px;
}

.toggle a {
  text-decoration: none;
}

.messageStyling {
  font-size: small;
}
</style>
