<template>
  <div>
    <div
      v-if="openLauncher && !isOpen"
      class="sc-launcher"
      :class="{opened: isOpen}"
      @click.prevent="isOpen ? close() : openAndFocus()"
      :style="{backgroundColor: colors.launcher.bg}"
      style="margin-top:525px"
    >
      <Header
        v-if="!isOpen"
        :showCloseButton="false"
        :title="chatWindowTitle"
        :imageUrl="titleImageUrl"
        :colors="colors"
        :onClose="close"
        style="height: inherit;"
      ></Header>
    </div>
    <!-- <div
        v-if="newMessagesCount > 0 && !isOpen"
        class="sc-new-messsages-count"
    >{{newMessagesCount}}</div>-->
    <img
      v-if="showLauncher"
      :src="icons.close.img"
      :alt="icons.close.name"
      style="z-index: 1;margin-left:333px"
      @click="closeLauncher"
      class="sc-header--close-button"
      ref="close_btn"
    />
    <ChatWindow
      :dist="dist"
      :showLauncher="showLauncher"
      :showCloseButton="showCloseButton"
      :messageList="messageList"
      :onUserInputSubmit="onMessageWasSent"
      :participants="participants"
      :title="chatWindowTitle"
      :titleImageUrl="titleImageUrl"
      :isOpen="isOpen"
      :onClose="close"
      :showEmoji="showEmoji"
      :showFile="showFile"
      :placeholder="placeholder"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
      :disableUserListToggle="disableUserListToggle"
      @scrollToTop="$emit('scrollToTop')"
      @onType="$emit('onType')"
      @edit="$emit('edit', $event)"
      @remove="$emit('remove', $event)"
      style="bottom: 0;z-index: 2"
    >
      <template v-slot:header>
        <slot name="header"></slot>
      </template>
      <template v-slot:user-avatar="scopedProps">
        <slot name="user-avatar" :user="scopedProps.user" :message="scopedProps.message"></slot>
      </template>
      <template v-slot:text-message-body="scopedProps">
        <slot
          name="text-message-body"
          :message="scopedProps.message"
          :messageText="scopedProps.messageText"
          :messageColors="scopedProps.messageColors"
          :me="scopedProps.me"
        ></slot>
      </template>
      <template v-slot:system-message-body="scopedProps">
        <slot name="system-message-body" :message="scopedProps.message"></slot>
      </template>
      <template v-slot:text-message-toolbox="scopedProps">
        <slot name="text-message-toolbox" :message="scopedProps.message" :me="scopedProps.me"></slot>
      </template>
    </ChatWindow>
  </div>
</template>
<script>
import ChatWindow from "./ChatWindow.vue";
import Header from "./Header";
import CloseIcon from "./assets/close-icon.png";
import OpenIcon from "./assets/logo-no-bg.svg";

export default {
  components: {
    ChatWindow,
    Header
  },
  props: {
    id: {
      type: Number
    },
    dist: {
      type: String,
      default: "25px"
    },
    icons: {
      type: Object,
      required: false,
      default: function() {
        return {
          open: {
            img: OpenIcon,
            name: "default"
          },
          close: {
            img: CloseIcon,
            name: "default"
          }
        };
      }
    },
    showEmoji: {
      type: Boolean,
      default: false
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    open: {
      type: Function,
      required: true
    },
    close: {
      type: Function,
      required: true
    },
    showFile: {
      type: Boolean,
      default: false
    },
    showLauncher: {
      type: Boolean,
      default: true
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    participants: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: () => ""
    },
    titleImageUrl: {
      type: String,
      default: () => ""
    },
    onMessageWasSent: {
      type: Function,
      required: true
    },
    messageList: {
      type: Array,
      default: () => []
    },
    newMessagesCount: {
      type: Number,
      default: () => 0
    },
    placeholder: {
      type: String,
      default: "Write a message..."
    },
    showTypingIndicator: {
      type: String,
      default: () => ""
    },
    colors: {
      type: Object,
      required: false,
      validator: c =>
        "header" in c &&
        "bg" in c.header &&
        "text" in c.header &&
        "launcher" in c &&
        "bg" in c.launcher &&
        "messageList" in c &&
        "bg" in c.messageList &&
        "sentMessage" in c &&
        "bg" in c.sentMessage &&
        "text" in c.sentMessage &&
        "receivedMessage" in c &&
        "bg" in c.receivedMessage &&
        "text" in c.receivedMessage &&
        "userInput" in c &&
        "bg" in c.userInput &&
        "text" in c.userInput,
      default: function() {
        return {
          header: {
            bg: "#4e8cff",
            text: "#ffffff"
          },
          launcher: {
            bg: "#4e8cff"
          },
          messageList: {
            bg: "#ffffff"
          },
          sentMessage: {
            bg: "#4e8cff",
            text: "#ffffff"
          },
          receivedMessage: {
            bg: "#f4f7f9",
            text: "#ffffff"
          },
          userInput: {
            bg: "#f4f7f9",
            text: "#565867"
          }
        };
      }
    },
    alwaysScrollToBottom: {
      type: Boolean,
      default: () => false
    },
    messageStyling: {
      type: Boolean,
      default: () => false
    },
    disableUserListToggle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    openAndFocus() {
      console.log("test");
      this.open();
      this.$root.$emit("focusUserInput");
      this.showLauncher = false;
    },
    closeLauncher() {
      this.showLauncher = false;
      this.$store.commit("toggleClicked", this.id);
    }
  },
  computed: {
    openLauncher() {
      return this.showLauncher;
    },
    chatWindowTitle() {
      if (this.title !== "") {
        return this.title;
      }

      if (this.participants.length === 0) {
        return "You";
      } else if (this.participants.length > 1) {
        return "You, " + this.participants[0].name + " & others";
      } else {
        return "You & " + this.participants[0].name;
      }
    }
  }
};
</script>
<style scoped>
.sc-launcher {
  width: 370px;
  height: 75px;
  background-position: center;
  background-repeat: no-repeat;
  bottom: 0;
  box-shadow: none;
  transition: box-shadow 0.2s ease-in-out;
  cursor: pointer;
  padding: 0;
  border-radius: 5px;
  border: 2px solid white;
  margin-left: 5px;
}
.sc-launcher .sc-open-icon,
.sc-launcher .sc-closed-icon {
  width: 60px;
  height: 60px;
  position: fixed;
  right: 25px;
  bottom: 25px;
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
}

.sc-launcher .sc-closed-icon {
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
  width: 60px;
  height: 60px;
}

.sc-launcher .sc-open-icon {
  padding: 20px;
  box-sizing: border-box;
  opacity: 1;
}

.sc-launcher.opened .sc-open-icon {
  transform: rotate(-90deg);
  opacity: 1;
}

.sc-launcher.opened .sc-closed-icon {
  transform: rotate(-90deg);
  opacity: 1;
}

.sc-launcher.opened:before {
  box-shadow: 0px 0px 400px 250px rgba(148, 149, 150, 0.2);
}

.sc-launcher:hover {
  box-shadow: 0 0px 27px 1.5px rgba(0, 0, 0, 0.2);
}

.sc-new-messsages-count {
  position: absolute;
  top: -3px;
  left: 41px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  background: #ff4646;
  color: white;
  text-align: center;
  margin: auto;
  font-size: 12px;
  font-weight: 500;
}
.sc-header--close-button {
  width: 40px;
  align-self: center;
  height: 40px;
  bottom: 74px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 10px;
  margin-left: auto;
  position: fixed;
  background-color: red;
}

.sc-header--close-button:hover {
  box-shadow: 0px 2px 5px rgba(0.2, 0.2, 0.5, 0.1);
}
.sc-header--close-button img {
  width: 100%;
  height: 100%;
  padding: 13px;
  box-sizing: border-box;
}
</style>
