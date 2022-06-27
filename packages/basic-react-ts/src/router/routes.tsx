import { lazy } from "react"
import { RouterRouteRaw } from "./utils"
import { Redirect } from "./utils/Redirect"

export const routes: RouterRouteRaw[] = [
  {
    path: "/",
    element: () => <Redirect to="/system" />
  },
  {
    path: "/login",
    element: lazy(() => import("@modules/Login"))
  },
  {
    path: "/system",
    element: lazy(() => import("@modules/System")),
    meta: {
      title: "123"
    },
    children: [
      {
        path: "",
        element: () => <Redirect to="/system/page1" />
      },
      {
        path: "page1",
        element: lazy(() => import("@modules/Page1"))
      },
      {
        path: "page2",
        element: lazy(() => import("@modules/Page2"))
      }
    ]
  },
  {
    path: "*",
    element: lazy(() => import("@modules/Error"))
  }
]
