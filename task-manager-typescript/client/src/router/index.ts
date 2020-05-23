import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () =>
        import("../views/Tasks.vue"),
    children: [
      {
        path: 'addTask',
        component: () => import("../components/tasks/TaskActions.vue"),
        meta: {
          add: true
        }
      },
      {
        path: ':id',
        component: () => import("../components/tasks/TaskActions.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
