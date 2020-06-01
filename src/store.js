import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
const fb = require('./backend.js')
//for common storage
Vue.use(Vuex)
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
export default store
