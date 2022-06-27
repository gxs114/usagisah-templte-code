import { getRequest } from "@share/request/proxyRequest"

export const ApiAJson = () => {
  return getRequest({
    url: "/a.json"
  })
}
