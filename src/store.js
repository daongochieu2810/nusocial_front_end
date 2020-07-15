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
    userProfile: null,
    communities: [],
    all_message_channels: [],
    notifications:[]
  },
  mutations: {
    addNotification(state, notification) {
      state.notifications.push(notification)
    },
    deleteNotification(state, id) {
      state.notifications.splice(id,1)
    },
    clearNotifications(state) {
      state.notifications = []
    },
    setCurrentUser(state, user) {
      state.currentUser = user
    },
    addChatbox(state,box) {
      state.chatbox.push(box)
    },
    clearChatbox(state) {
      state.chatbox = []
    },
    setCommunities(state, data) {
      state.communities = data
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
    toggleClickedTrue(state, id) {
      let bx = state.chatbox.find(item => item.id === id);
      bx.clicked = true;
    },
    toggleClickedFalse(state, id) {
      let bx = state.chatbox.find(item => item.id === id);
      bx.clicked = false;
    },
    setUserProfile(state, val) {
        state.userProfile = val
    },
    toggleLoading(state) {
      state.isLoading = !state.isLoading
    },
    toggleLoadingTrue(state) {
      state.isLoading = true
    },
    toggleLoadingFalse(state) {
      state.isLoading = false
    },
    setMsgChannels(state, val) {
      state.all_message_channels = val
    }
  },
  actions: {
    clearData({commit}) {
      commit('setCurrentUser', null)
      commit('setUserProfile', null)
      
    },
    async fetchUserProfile({ commit, state }) {
        await fb.userCollection.doc(state.currentUser.uid).get().then(function(res) {
            commit('setUserProfile', res.data())
        })
    },
    async fetchCommunities({commit, state}) {
        //commit("toggleLoadingTrue");
        await fb.communityCollection
          .where("allMembersID", "array-contains", state.currentUser.uid)
          .onSnapshot(function(res) {
            let comm = []
            res.forEach(doc => {
                //var doc = change.doc
                comm.push(doc.data());
            })
            commit('setCommunities', comm)
           // commit("toggleLoadingFalse");
          })
    },
    async fetchMessageChannels({commit, state}) {
      //commit("toggleLoadingTrue")
      //var user = state.userProfile
      var holder = []
      await fb.messagesChannelCollection
        .where("recipients", "array-contains", {
          first: state.currentUser.uid,
          second: state.userProfile.name
        })
        .onSnapshot(res => {
          res.docChanges().forEach(change => {
            var doc = change.doc
            if(change.type == "added") {
            holder.push(doc.data())
            } else if(change.type == "modified") {
              for(let index in holder) {
                if(holder[index].id == doc.data().id) {
                  holder[index] = doc.data()
                }
              }
            }
          });
        });
        commit("setMsgChannels", holder)
        //commit("toggleLoadingFalse")
    }
  },
  modules: {
  }
})
export default store
