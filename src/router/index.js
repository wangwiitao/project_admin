import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
// import Login from "../views/Login/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "Login",
    component: ()=> import ("../views/Login/Index.vue")
  },
  {
    path: "/console",
    name: "Console",
    component: ()=>import("../views/Layout/Index.vue")
  },

];

const router = new VueRouter({
  routes
});

export default router;
