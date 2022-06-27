import { useState } from "react"

/**
 * @description 更新函数，相当于 vue 的 forceUpdate
 * @example
 * const forceUpdate = useForceUpdate()
 * forceUpdate()
 */
export function useForceUpdate() {
  const [, setState] = useState(0)
  return () => setState(() => new Date().getTime())
}
