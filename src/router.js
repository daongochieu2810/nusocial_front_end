import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
import DashBoard from "./components/Dashboard/DashBoard";
import Community from "./components/Community/Community";
import SingleCommunity from "./components/Community/SingleCommunity";
import History from "./components/History/History";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Authenticate from "./components/Auth/Authenticate";
import EditUsername from "./components/Auth/EditUsername";
import EditPassword from "./components/Auth/EditPassword";
//import Register from './components/Auth/Register'
import General from "./components/Messages/General";

Vue.use(Router);
const routes = [
    { path: "/login", name: "Login", component: Login },
    { path: "/authenticate", name: "Authenticate", component: Authenticate },
    //{ path: '/register', name: 'Register',component: Register },
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: DashBoard,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/community",
        name: "Community",
        component: Community,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/community/:comm_id",
        name: "SingleCommunity",
        component: SingleCommunity,
        meta: {
            requiresAuth: true,
        },
        props: true,
    },
    {
        path: "/history",
        name: "History",
        component: History,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/messages",
        name: "Messages",
        component: General,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/editusername",
        name: "EditUsername",
        component: EditUsername,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/editpassword",
        name: "EditPassword",
        component: EditPassword,
        meta: {
            requiresAuth: true,
        },
    },
];
const router = new Router({
    mode: "history",
    routes,
});
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
    const currentUser = firebase.auth().currentUser;
    if (requiresAuth && !currentUser) {
        next("/login");
    } else if (requiresAuth && currentUser) {
        next();
    } else {
        next();
    }
});

export default router;
