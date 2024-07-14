const routes = [
  {
    path: "/home",
    component: () => import("@/pages/home/index.vue"),
  },
  {
    path: "/about",
    component: () => import("@/pages/about/index.vue"), //路由懒加载
  },
];

export default routes;
