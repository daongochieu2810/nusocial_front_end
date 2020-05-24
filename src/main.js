import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import DashBoard from './components/Dashboard/DashBoard'
import Community from './components/Community/Community'
import SingleCommunity from './components/Community/SingleCommunity'
import History from './components/History/History'
import Home from './components/Home/Home'
import General from './components/Messages/General'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Chat from './components/MessagePipeline/index'
import wysiwyg from "vue-wysiwyg";
import vmodal from 'vue-js-modal'
import "vue-wysiwyg/dist/vueWysiwyg.css";
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import firebase from 'firebase'
import Vuex from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



Vue.use(Vuex)
const firebaseConfig = {
  apiKey: "AIzaSyDyZ_QMDOFYLMHDfsm9zOszFwYf399uwdI",
  authDomain: "nusocial-7c7e8.firebaseapp.com",
  databaseURL: "https://nusocial-7c7e8.firebaseio.com",
  projectId: "nusocial-7c7e8",
  storageBucket: "nusocial-7c7e8.appspot.com",
  messagingSenderId: "691432966606",
  appId: "1:691432966606:web:bc942ec314fd281f75039f",
  measurementId: "G-BTTJ0DQ2FR"
};
// Initialize Firebase   
firebase.initializeApp(firebaseConfig); 

var db = firebase.database();

window.db = db;


Vue.use(Chat, {})
Vue.use(vmodal , { dialog: true })
Vue.use(PerfectScrollbar)
Vue.use(wysiwyg, { hideModules: {}, 
  // if the image option is not set, images are inserted as base64
  image: {
    uploadURL: "/api/myEndpoint",
    dropzoneOptions: {}
  }
  // limit content height if you wish. If not set, editor size will grow with content.
}); // config is optional. more below
Vue.config.productionTip = false
Vue.use(VueRouter)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: DashBoard },
  { path: '/community', component: Community },
  { path: '/community1', component: SingleCommunity },
  { path: '/history', component: History },
  { path: '/messages', component: General }
]
const router = new VueRouter({
  routes
})

let store = new Vuex.Store({
  state: {
    chatbox : []
  },
  mutations: {
    addChatbox(state,box) {
      state.chatbox.push(box)
    },
    changeBox(state,id) {
      let bx = state.chatbox.find(item => item.id === id);
      bx.isOpen = !bx.isOpen;
      bx.clicked = true;
    },
    changeBoxTrue(state,id) {
      state.chatbox.find(item => item.id === id).isOpen = true
    },
    changeBoxFalse(state,id) {
      state.chatbox.find(item => item.id === id).isOpen = false
    }
  },
  actions: {
  },
  modules: {
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
