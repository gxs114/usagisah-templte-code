import { noop } from "@share/hooks/utils"
import { ElLoading, ElMessage } from "element-plus"
import { request as originRequest, RequestOptions } from "./request"

export interface ActionOptions {
  loading?: boolean
  fileType?: "file" | "preview"
}
export interface ProxyRequestOptions extends ActionOptions {
  data?: Record<string, any>
  url: string
}

export function getRequest({ url, data, loading }: ProxyRequestOptions) {
  return basicRequestWrapper(
    {
      url,
      data,
      method: "GET"
    },
    { loading }
  )
}

export function postRequest({ url, data, loading }: ProxyRequestOptions) {
  return basicRequestWrapper(
    {
      url,
      data,
      method: "POST"
    },
    { loading }
  )
}

export function formRequest({ url, data, loading }: ProxyRequestOptions) {
  return originRequest({
    url,
    data,
    method: "FORM"
  })
}

/* 
  普通请求包装器，用于包装普通请求，做一些所有请求的统一的处理
*/
function basicRequestWrapper(
  options: RequestOptions,
  { loading = true }: ActionOptions
) {
  const close = loading ? ElLoading.service({ lock: true }) : { close: noop }
  return originRequest(options)
    .then(res => {
      // 这里可以做一些错误判断，比如 code == 1，或者存在错误信息就打印以下
      // ElMessage({ type: "error", message: res.[0].message })
      return res[0]
    })
    .finally(() => close.close())
}

/* 
  二进制流包装器，包含了一些二进制流的处理
*/
function streamRequestWrapper(
  options: RequestOptions,
  { loading = true, fileType }: ActionOptions
) {
  const close = loading ? ElLoading.service({ lock: true }) : { close: noop }
  const fileTypeMap: Record<
    NonNullable<ActionOptions["fileType"]>,
    RequestOptions["resType"]
  > = {
    file: "blob",
    preview: "arrayBuffer"
  }
  return originRequest({
    ...options,
    ...(fileType && { resType: fileTypeMap[fileType] })
  })
    .then(([stream, { headers }]) => {
      // 这里可以做一些错误判断，比如 code == 1，或者存在错误信息就打印以下
      // ElMessage({ type: "error", message: res.[0].message })

      // 这里需要根据后端的格式，从 headers 取一个文件名出来
      return stream
    })
    .finally(() => close.close())
}
