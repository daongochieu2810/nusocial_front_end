import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import DashBoard from './components/Dashboard/DashBoard'
import Community from './components/Community/Community'
import SingleCommunity from './components/Community/SingleCommunity'
import History from './components/History/History'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
/*import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
Vue.use(VueApollo);*/
Vue.use(PerfectScrollbar)
Vue.use(wysiwyg, { hideModules: {}, 
  // if the image option is not set, images are inserted as base64
  image: {
    uploadURL: "/api/myEndpoint",
    dropzoneOptions: {}
  }
  // limit content height if you wish. If not set, editor size will grow with content.
}); // config is optional. more below
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false
Vue.use(VueRouter)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
const routes = [
  { path: '/dashboard', component: DashBoard },
  { path: '/community', component: Community },
  { path: '/community1', component: SingleCommunity },
  { path: '/history', component: History }
]
const router = new VueRouter({
  routes
})
/*const getHeaders = () => {
  const headers = {};
   const token = window.localStorage.getItem('apollo-token');
   if (token) {
     headers.authorization = `Bearer ${token}`;
   }
   return headers;
 };
 // Create an http link:
 const link = new HttpLink({
   uri: 'https://hasura.io/learn/graphql',
   fetch,
   headers: getHeaders()
 });
 const client = new ApolloClient({
   link: link,
   cache: new InMemoryCache({
     addTypename: true
   })
 });
 const apolloProvider = new VueApollo({
  defaultClient: client,
})*/

new Vue({
  router,
  //apolloProvider,
  render: h => h(App),
}).$mount('#app')
