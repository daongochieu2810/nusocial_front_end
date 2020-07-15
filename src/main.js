import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Chat from "./components/MessagePipeline/index";
import vmodal from "vue-js-modal";
import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
import router from "./router.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueQuillEditor from "vue-quill-editor";
import axios from "axios";

Vue.prototype.$axios = axios;

import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import store from "./store.js";

const fb = require("./backend.js");
Vue.config.productionTip = false;

Vue.use(VueQuillEditor /* { default global options } */);

//messaging pipeline
Vue.use(Chat, {});

//system dialog
Vue.use(vmodal, { dialog: true });

//scrollable component
Vue.use(PerfectScrollbar);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

let app = null;
fb.auth.onAuthStateChanged((user) => {
    console.log(user);
    if (!app) {
        app = new Vue({
            router,
            store,
            render: (h) => h(App),
        });
        app.$mount("#app");
    }
    if (user != null) {
        store.commit("setCurrentUser", user);
        store.dispatch("fetchUserProfile");
    }
});
