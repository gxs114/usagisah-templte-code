import { useFromQueryParams } from "@share/hooks/dom"
import { Obj } from "./../hooks/type"
import { baseOptions } from "./baseOptions"

export interface RequestOptions {
  url: string
  method?: "GET" | "POST" | "FORM" | "PUT" | "DELETE"
  headers?: RequestInit["headers"]
  data?: Obj
  resType?: "json" | "arrayBuffer" | "text" | "blob"
  timeout?: number
}

export function request({
  url,
  method = "GET",
  data,
  headers,
  resType = "json",
  timeout
}: RequestOptions) {
  let reqUrl = baseOptions.url + url
  const opts: RequestInit = {
    method: method.toLocaleUpperCase(),
    headers: {
      ...baseOptions.headers,
      ...headers
    }
  }
  if (opts.method === "FORM" && data) {
    opts.headers = {}
    Object.keys(data).reduce(
      (form, key) => (form.append(key, data[key]), form),
      (opts.body = new FormData())
    )
  } else if (opts.method === "POST") {
    opts.body = JSON.stringify(data)
  } else if (opts.method === "GET" && data) {
    const query = useFromQueryParams(data!)
    reqUrl + "?" + query
  }

  return new Promise<[any, Response]>((resolve, reject) => {
    const _timeout = baseOptions.timeout ?? timeout ?? 5000
    const timer = setTimeout(() => reject("request: 请求超时"), _timeout)
    fetch(reqUrl, opts)
      .then(
        async response => {
          const data = await response[resType]()
          resolve([data, response])
        },
        err => {
          reject(err)
        }
      )
      .finally(() => clearTimeout(timer))
  })
}
