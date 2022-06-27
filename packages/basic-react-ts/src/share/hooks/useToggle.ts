import { Dispatch, SetStateAction, useLayoutEffect, useState } from "react"

/**
 * @description 参数支持4种类型：boolean, number, string, Array<any>
 * 返回值类型为 [当前值, 自动切换值, setState原值值函数]
 *
 * @example
 * const [bool, toggleBool, setBool] = useToggle(true)
 * const [aStr, toggleAStr, setAStr] = useToggle([1,2,3])
 * const [num, toggleNum, setNum] = useToggle(1)
 * const [str, toggleStr, setStr] = useToggle("123")  // 如果是字符串，会被拆解成数组，按照数组模式来切换
 */
export function useToggle(initialValue: boolean): ReturnType<typeof withBoolean>
export function useToggle(initialValue: number): ReturnType<typeof withNumber>
export function useToggle(
  initialValue: string
): [string, () => void, Dispatch<SetStateAction<string[]>>]
export function useToggle<T>(
  initialValue: T[]
): [T, () => void, Dispatch<SetStateAction<any[]>>]
export function useToggle(initialValue: any) {
  switch (typeof initialValue) {
    case "boolean":
      return withBoolean(initialValue)
    case "number":
      return withNumber(initialValue)
    case "object":
      if (Array.isArray(initialValue)) {
        return withArray(initialValue)
      }
    case "string":
      return withArray(initialValue)
    default:
      throw Error("useToggle: value must be boolean or array or number")
  }
}

function withBoolean(value: boolean) {
  const [bool, setBool] = useState(value)
  const toggle = () => setBool(!bool)
  useLayoutEffect(() => {
    setBool(value)
  }, [value])
  return [bool, toggle, setBool] as const
}

function withNumber(value: number) {
  const [n, setN] = useState(value)
  const toggle = () => setN(n + 1)
  useLayoutEffect(() => {
    setN(value)
  }, [value])
  return [n, toggle, setN] as const
}

function withArray<T>(value: T[]) {
  const [ary, setAry] = useState(value)
  const [index, setIndex] = useState(0)
  const toggle = () => {
    return ary.length === 0
      ? null
      : ary[index + 1]
      ? setIndex(index + 1)
      : setIndex(0)
  }
  useLayoutEffect(() => {
    setAry(value)
  }, [value])
  return [ary[index], toggle, setAry] as const
}
