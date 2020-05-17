<template>
  <div class="sc-message--text" :style="messageColors">
    <template>
      <div class="sc-message--toolbox" :style="{background: messageColors.backgroundColor}">
        <button
          v-if="me && message.id != null && message.id != undefined"
          @click="edit"
          :disabled="isEditing"
        >
          <icon-base :color="isEditing? 'black' : messageColors.color" width="10" icon-name="edit">
            <icon-edit />
          </icon-base>
        </button>
      </div>
    </template>
  </div>
</template>
<script>
import IconBase from "./../components/IconBase.vue";
import IconEdit from "./../components/icons/IconEdit.vue";
import IconCross from "./../components/icons/IconCross.vue";
import escapeGoat from "escape-goat";
import Autolinker from "autolinker";
import store from "../store";
const fmt = require("msgdown");
export default {
  components: {
    IconBase,
    IconCross,
    IconEdit
  },
  data() {
    return {
      store
    };
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    messageColors: {
      type: Object,
      required: true
    },
    messageStyling: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    messageText() {
      const escaped = escapeGoat.escape(this.message.data.text);
    }
  }
};
</script>
<style scoped>
a.chatLink {
  color: inherit !important;
}
</style>