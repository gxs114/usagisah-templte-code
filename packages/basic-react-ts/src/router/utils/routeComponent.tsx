import { FC, useState, useLayoutEffect, Suspense } from "react"
import { useNavigate } from "react-router-dom"
import { RouterContext, RouterRouteRaw } from "./createRouter"
import { useRoute } from "./createRouter"

const isPromise = (value: unknown): value is Promise<any> => {
  return value instanceof Promise
}

const parseQuery = () => {
  const query: Record<string, string> = {}
  location.search
    .slice(1)
    .split("&")
    .forEach(item => {
      item = decodeURIComponent(item).trim()
      if (item.length === 0) {
        return
      }

      const res = item.split("=")
      const key = res[0].trim()
      if (key.length === 0) {
        return
      }

      query[key] = res.slice(1).join("").trim()
    })
  return query
}

const callWithErrorHandle = (fn: any) => {
  try {
    fn()
  } catch (e) {
    console.error("router: beforeEach 调用期间出现错误", e)
  }
}

export function resolveRouteComponent(
  { path, meta, element, fallback }: RouterRouteRaw,
  routerContext: RouterContext
): FC {
  return function RouteComponent() {
    const [Component, setComponent] = useState<any>(null)
    const to = useNavigate()
    const route = useRoute()
    const updateRouteContext = () => {
      routerContext.fromRouter = routerContext.toRouter
      routerContext.query = route.query = parseQuery()
      routerContext.path = route.path = path
      routerContext.meta = route.meta = meta ?? {}
    }

    useLayoutEffect(() => {
      callWithErrorHandle(() => {
        const beforeEachPromise = routerContext.beforeEach(
          (routerContext.toRouter = { path: location.href, meta: meta ?? {} }),
          routerContext.fromRouter
        )

        if (!isPromise(beforeEachPromise)) {
          return console.error("router: beforeEach守卫必须")
        }

        beforeEachPromise.then((res: unknown) => {
          if (res === true) {
            updateRouteContext()
            setComponent(
              typeof element === "function" ? () => element : element
            )
          } else if (typeof res === "string") {
            updateRouteContext()
            to(res)
          } else {
            console.error(
              `router: beforeEach守卫返回非法类型 ${typeof res}，请阅读文档来返回正确类型进行使用`
            )
          }
        })
      })
    }, [])

    if (Component) {
      updateRouteContext()
    }

    return Component ? (
      <Suspense fallback={fallback}>
        <Component></Component>
      </Suspense>
    ) : null
  }
}
