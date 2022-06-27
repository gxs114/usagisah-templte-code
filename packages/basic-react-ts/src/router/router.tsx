import { BrowserRouter } from "react-router-dom"
import { routes } from "./routes"
import { createRouter } from "./utils"

const resolveRouteName = (path: string) => path.split("/").at(-1)

export const AppRouter = createRouter({
  history: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
  route: routes,
  beforeEach: async (to, from) => {
    console.log("路由守卫", resolveRouteName(to.path))
    return true
  }
})
