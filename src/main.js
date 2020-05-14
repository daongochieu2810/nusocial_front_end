import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import DashBoard from './components/Dashboard/DashBoard'
import Community from './components/Community/Community'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
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
  { path: '/community', component: Community }
]
const router = new VueRouter({
  routes
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
