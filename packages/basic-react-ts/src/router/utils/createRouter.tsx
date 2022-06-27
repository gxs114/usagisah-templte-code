import { FC } from "react"
import { useRoutes } from "react-router-dom"
import { normalizeRoute } from "./normalizeRoute"

type BeforeEach = (
  to: RouteLocationMeta,
  from: RouteLocationMeta
) => Promise<boolean | string>

export interface RouteLocationMeta {
  path: string
  meta: Record<string, any>
}

export interface RouteMeta extends RouteLocationMeta {
  query: Record<string, string>
}

export interface RouterContext extends RouteLocationMeta {
  beforeEach: BeforeEach
  fromRouter: RouteLocationMeta
  toRouter: RouteLocationMeta
  query: Record<string, string>
}

export interface RouterRouteRaw {
  caseSensitive?: boolean
  children?: RouterRouteRaw[]
  element: FC<any>
  index?: boolean
  path: string
  fallback?: React.ReactNode
  meta?: Record<string, any>
}

export interface RouterOptions {
  route: RouterRouteRaw[]
  history: (props: {
    children: React.ReactNode
    [key: string]: any
  }) => React.ReactElement
  beforeEach?: BeforeEach
}

let activeRouterContext: RouterContext
let activeRoute: RouteMeta = {} as any

export function useQuery() {
  if (!activeRouterContext) {
    console.error("router: useQuery, 当前路由尚未初始化，无法解析当前路由参数")
    return {}
  }
  return activeRouterContext.query
}

export function useRoute(): RouteMeta {
  if (!activeRouterContext) {
    console.error("router: useQuery, 当前路由尚未初始化，无法返回当前路由")
    return {} as any
  }
  return activeRoute
}

export function createRouter(options: RouterOptions) {
  const routerContext: Partial<RouterContext> = (activeRouterContext = {
    query: {},
    path: "",
    meta: {},
    fromRouter: { path: "", meta: {} },
    toRouter: { path: "", meta: {} },
    beforeEach: options.beforeEach ?? (() => Promise.resolve(true))
  })
  const AppRoute = () => {
    const routes = normalizeRoute(
      options.route,
      routerContext as Required<RouterContext>
    )
    return useRoutes(routes)
  }

  return function AppRouter(...props: any[]) {
    return options.history({
      children: <AppRoute></AppRoute>,
      ...props
    })
  }
}
