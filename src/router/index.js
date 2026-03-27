//router.js当然要创建路由对象咯
import { createRouter, createWebHistory } from "vue-router";
import WholeCat from "@/view/WholeCat.vue";
import UserLogin from "@/components/login/UserLogin.vue";
import RareCatSecKill from "@/view/RareCatSecKill.vue";
import QueryUser from "@/components/QueryUser.vue";
import UserView from "@/view/UserView.vue";
//定义routes
const routes = [
  {
    path: "/cat",
    component: WholeCat,
    name: "cat",
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: UserLogin,
    name: "userLogin",
  },
  {
    path: "/queryUser",
    component: QueryUser,
    name: "queryUser",
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    redirect: "/cat",
  },
  {
    path: "/rare",
    component: RareCatSecKill,
    name: "rareCatSecnKill",
    meta: { requiresAuth: true },
  },
  {
    path: "/queryUser",
    component: QueryUser,
    name: "QueryUser",
    meta: { requiresAuth: true },
  },
  {
    path: "/userView",
    component: UserView,
    name: "UserView",
    meta: { requiresAuth: true },
  },
];
//参考，route的属性:path,name,component------重定向:path,redirect

const router = createRouter({
  //需要传入history方法，和routes列表
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");
  //判断有没有token存在。
  if (!isAuthenticated && to.meta.requiresAuth) {
    next("/login");
    //如果没登录，就跳到登录页
  } else {
    next();
    //不然就放心
  }
});

export default router;
