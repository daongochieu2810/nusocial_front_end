import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Chat from './components/MessagePipeline/index'
import wysiwyg from "vue-wysiwyg";
import vmodal from 'vue-js-modal'
import "vue-wysiwyg/dist/vueWysiwyg.css";
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import router from './router.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store.js'
const fb = require('./backend.js')
Vue.config.productionTip = false



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