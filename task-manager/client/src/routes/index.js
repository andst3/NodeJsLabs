import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "../views/Home";
import Tasks from "../views/Tasks";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/tasks',
        component: Tasks
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;