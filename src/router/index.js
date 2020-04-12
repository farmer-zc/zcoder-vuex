import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/components/Layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue")
  },
  {
    path: "/",
    name: "layout",
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home/index.vue")
      },
      {
        path: "/vue/",
        name: "vue",
        component: () => import("../views/compDemo/layout.vue"),
        redirect: '/vue/index',
        children: [
          {
            path: "index",
            name: "index",
            component: () => import("../views/compDemo/index/index.vue")
          },
          {
            path: "communication",
            name: "communication",
            component: () => import("../views/compDemo/communication/index.vue")
          },
          {
            path: "slotDemo",
            name: "slotDemo",
            component: () => import("../views/compDemo/slotDemo/index.vue")
          }
        ]
      },
      {
        path: "/vuex/index",
        name: "vuex",
        component: () => import("../views/vuex/index.vue")
      },
      {
        path: "/vuex/detail",
        redirect: '/vuex/index',
      },
      {
        path: "/vuex/detail/:id",
        name: "detail",
        component: () => import("../views/vuex/detail/index.vue")
      },
      {
        path: "/base",
        name: "base",
        component: () => import("../views/base/index.vue")
      }
    ]
  },
  { 
    path: '*',
    component: () => import("../views/notfound/index.vue"),
    name:'404页面' 
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
