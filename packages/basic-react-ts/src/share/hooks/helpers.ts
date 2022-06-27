export function compose<T = unknown>(...fns: ((...arg: any[]) => any)[]) {
  return function (value: unknown): T {
    return fns.reduce((a, b) => b(a), value) as T
  }
}

export const isEmpty = (value: unknown) => {
  return value === null || value === undefined || value === ""
}

export const isUndefined = (value: unknown) => {
  return value === undefined
}

export const isBoolean = (value: unknown) => {
  return typeof value === "boolean"
}
