import { RouteObject } from "react-router-dom"
import { RouterContext, RouterRouteRaw } from "./createRouter"
import { resolveRouteComponent } from "./routeComponent"

export function normalizeRoute(
  routes: RouterRouteRaw[],
  routerContext: RouterContext
): RouteObject[] {
  return routes.map(route => {
    const Component = resolveRouteComponent(route, routerContext)
    const children = route.children
    return {
      index: route.index,
      caseSensitive: route.caseSensitive,
      path: route.path,
      element: <Component />,
      children:
        Array.isArray(children) &&
        children.length > 0 &&
        normalizeRoute(children, routerContext)
    } as RouteObject
  })
}
