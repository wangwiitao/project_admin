import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
// import Login from "../views/Login/Index.vue";
import Layout from '@/views/Layout/Index'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden:true,
    meta:{
      name:"主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden:true,
    component: ()=> import ("../views/Login/Index.vue"),
    meta:{
      name:"登录"
    }
  },
  {
    path: "/console",
    name: "Console",
    redirect:"index",
    meta:{
      name:"控制台",
      icon:"el-icon-s-open"
    },
    component: Layout,
    children:[
      {
        path:"/index",
        name:"Index",
        meta:{
          name:"首页",
        },
        component: ()=>import("../views/Console/Index.vue"),
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    meta:{
      name:"信息管理",
      icon:"el-icon-s-order"
    },
    component: Layout,
    children:[
      {
        path:"/infoIndex",
        name:"InfoIndex",
        meta:{
          name:"信息列表"
        },
        component: ()=>import("../views/Info/Index.vue"),
      },
      {
        path:"/infoCategory",
        name:"InfoCategory",
        meta:{
          name:"信息分类"
        },
        component: ()=>import("../views/Info/Category.vue"),
      },
    ]
  },
  // users
  {
    path: "/user",
    name: "User",
    meta:{
      name:"用户管理",
      icon:"el-icon-s-promotion"
    },
    component: Layout,
    children:[
      {
        path:"/userIndex",
        name:"UserIndex",
        meta:{
          name:"用户列表"
        },
        component: ()=>import("../views/User/Index.vue"),
      },
    ]
  }

];

const router = new VueRouter({
  routes
});

export default router;
