import { RouteRecordRaw } from "vue-router"

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@modules/Hello/index.vue")
  },
  // 嵌套路由
  // {
  //   name: "system",
  //   path: "/system",
  //   component: () => import("@modules/System/index.vue"),
  //   children: [
  //     {
  //       path: "utils",
  //       component: () => import("@modules/Utils/index.vue")
  //     },
  //     {
  //       path: "request",
  //       component: () => import("@modules/Request/index.vue")
  //     }
  //   ]
  // },
  // 动态路由，404 路由
  {
    path: "/:all*",
    component: () => import("@modules/Error/index.vue")
  }
]
