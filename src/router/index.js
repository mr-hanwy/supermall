import Vue from "vue"; // 导入 vue
import VueRouter from "vue-router"; // 导入 vue-router 组件

// 导入页面
const Home = () => import('@/views/home/Home');
const Category = () => import('@/views/category/Category');
const ShopCart = () => import('@/views/shopcart/ShopCart');
const Profile = () => import('@/views/profile/Profile');
const Detail = () => import('@/views/detail/Detail');

/**
 * 安装使用 VueRouter 组件
 */
Vue.use(VueRouter);

/**
 * 配置路由规则（设置页面跳转路径）
 * @type {*[]}
 */
const routes = [
  {path: '', redirect: '/home'},
  {path: '/home', component: Home},
  {path: '/category', component: Category},
  {path: '/shopcart', component: ShopCart},
  {path: '/profile', component: Profile},
  {path: '/detail', component: Detail}
];

/**
 * 创建 router 对象
 * @type {VueRouter}
 */
const router = new VueRouter({

  /**
   * 配置路由规则（设置页面跳转路径）
   */
  routes,
  /**
   * 设置路由默认使用模式
   * 最明显的一个区别如下
   * 1. history：地址栏中没有 “#”
   * 2. hash：地址栏中有 “#”，vue-router 默认模式
   */
  mode: 'hash'
});

/**
 * 导出 router 对象，以提供给其他组件进行使用（一般在 main.js 中进行使用即可）
 */
export default router;
