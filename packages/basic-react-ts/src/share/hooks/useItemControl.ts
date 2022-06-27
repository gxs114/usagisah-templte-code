import { Dispatch, useLayoutEffect, useRef, useState } from "react"

/**
 * @description 创建一个状态管理器
 * @example
 * //父组件
 * const [filterIns, bindFilter] = useItemControl()
 * <Filters {...filters}></Filters>
 *
 * //子组件
 * function Filters({ useItemState }: ItemStateProps) {
 *  const [state, setState] = useItemState("") //相当于 useState
 * }
 */
export function useItemControl() {
  const cacheState = useRef(new Map<string, any>())
  const validate = () => {
    let isValid = true
    cacheState.current.forEach(item => !item.validate() && (isValid = false))
    return isValid
  }
  const reset = () => {
    cacheState.current.forEach(item => item.reset())
  }
  const state = () => {
    const values: Record<string, any> = {}
    cacheState.current.forEach(item => (values[item.key] = item.state()))
    return values
  }

  return [
    { validate, reset, state },
    { useItemState: useItemState(cacheState.current) }
  ] as const
}
export type ItemStateProps = {
  useItemState: <T>(
    key: string,
    initState: T,
    options?: ItemStateOptions<T>
  ) => readonly [T, (newValue: T) => void, ...any[]]
}

type ItemStateOptions<T> = {
  validate?: (state: T) => boolean
  factory?: (initState: any) => [T, Dispatch<T>, ...any[]]
  submit?: (state: T) => any
}
function useItemState(map: Map<string, any>) {
  return function <T>(
    key: string,
    initState: T,
    { validate, factory, submit }: ItemStateOptions<T> = {}
  ) {
    const [_state, _setState, ...rest] = (
      typeof factory === "function" ? factory : useState
    )(initState)
    const userRef = useRef({
      validate,
      submit,
      source: initState,
      state: _state
    })

    userRef.current.validate = validate
    userRef.current.submit = submit
    userRef.current.state = _state

    useLayoutEffect(() => {
      const reset = () => {
        _setState(userRef.current.source)
      }
      const state = () => {
        const { state, submit } = userRef.current
        return typeof submit === "function" ? submit(state as any) : state
      }
      const validate = () => {
        const { validate } = userRef.current
        const value: any = state()
        return typeof validate === "function" ? validate(value) : true
      }

      map.set(key, { key, reset, state, validate })
      return () => {
        map.delete(key)
      }
    }, [])
    return [
      _state as T,
      function setState(newValue: T) {
        newValue = typeof newValue === "function" ? newValue(_state) : newValue
        userRef.current.state = newValue
        _setState(newValue)
      },
      ...rest
    ] as const
  }
}
