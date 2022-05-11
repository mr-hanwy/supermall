import Vue from 'vue';
import VueRouter from "vue-router";

const Home = () => import('views/home/Home');
const Category = () => import('views/category/Category');
const Shopcart = () => import('views/shopcart/Shopcart');
const Profile = () => import('views/profile/Profile');

Vue.use(VueRouter);

const routes = [
  {path: "/", redirect: '/home'},
  {path: "/Home", component: Home},
  {path: "/Category", component: Category},
  {path: "/Shopcart", component: Shopcart},
  {path: "/Profile", component: Profile}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
