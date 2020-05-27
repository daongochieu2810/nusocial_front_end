import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Chat from './components/MessagePipeline/index'
import wysiwyg from "vue-wysiwyg";
import vmodal from 'vue-js-modal'
import "vue-wysiwyg/dist/vueWysiwyg.css";
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import Vuex from 'vuex'
import router from './router.js'
import createPersistedState from 'vuex-persistedstate'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
const fb = require('./backend.js')
Vue.config.productionTip = false

//for common storage
Vue.use(Vuex)

//messaging pipeline
Vue.use(Chat, {})

//system dialog
Vue.use(vmodal , { dialog: true })

//scrollable component
Vue.use(PerfectScrollbar)

//text editor
Vue.use(wysiwyg, { hideModules: {}, 
  // if the image option is not set, images are inserted as base64
  image: {
    uploadURL: "/api/myEndpoint",
    dropzoneOptions: {}
  }
}); 
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

//global storage 
let store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
  state: {
    chatbox : [],
    isLoading: false,
    currentUser: null,
    userProfile: {}
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
    },
    toggleClicked(state, id) {
      let bx = state.chatbox.find(item => item.id === id);
      bx.clicked = !bx.clicked;
    },   setCurrentUser(state, val) {
        state.currentUser = val
    },
    setUserProfile(state, val) {
        state.userProfile = val
    },
    toggleLoading(state) {
      state.isLoading = !state.isLoading
    }
  },
  actions: {
    clearData({commit}) {
      commit('setCurrentUser',null)
      commit('setUserProfile',{})
      
    },
   fetchUserProfile({ commit, state }) {
        fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
            commit('setUserProfile', res.data())
        }).catch(err => {
            console.log(err)
        })
    }
  },
  modules: {
  }
})

let app = null;
fb.auth.onAuthStateChanged(user => {
  console.log(user)
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        })
        app.$mount('#app')
    }
})