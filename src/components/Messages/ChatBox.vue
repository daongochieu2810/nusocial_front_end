<template>
  <div>
    <beautiful-chat
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
import messageHistory from "./messageHistory";
import chatParticipants from "./chatProfiles";
import availableColors from "./colors";

export default {
  props: {
      dist: {
          type: String,
          default: "25px"
      },
      isOpen: {
          type: Boolean
      },
      id: {
          type: Number
      },
       clicked:{
           type: Boolean
       }
  },
  data() {
    return {
      participants: chatParticipants,
      titleImageUrl: require("./../../assets/logo.png"),
      messageList: messageHistory,
      newMessagesCount: 0,
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
          text: "#565867"
        }
      },
      availableColors,
      chosenColor: null,
      alwaysScrollToBottom: true,
      messageStyling: true,
      userIsTyping: false,
    };
  },
  methods: {
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1;
        this.onMessageWasSent({
          author: "support",
          type: "text",
          id: Math.random(),
          data: { text }
        });
      }
    },
    handleTyping(text) {
     this.showTypingIndicator =
        text.length > 0
          ? this.participants[this.participants.length - 1].id
          : "";
    },
    onMessageWasSent(message) {
     this.messageList = [
        ...this.messageList,
        Object.assign({}, message, { id: Math.random() })
      ];
    },
    openChat() {
      this.$store.commit('changeBoxTrue', this.id)
      this.newMessagesCount = 0;
      console.log("testopen");
    },
    closeChat() {
      this.clicked = true;
      this.$store.commit('changeBoxFalse', this.id)
      console.log("testclose");
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
      this.$root.$emit("onType",id);
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
body {
  padding: 0px;
  margin: 0px;
}

* {
  font-family: Avenir Next, Helvetica Neue, Helvetica, sans-serif;
}

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
