import { useLayoutEffect, useState } from "react"
import { compose, isBoolean, isEmpty, isUndefined } from "./helpers"

type ModelOptions = {
  value?: any
  filters?: Array<(value: string) => string>
  skipError?: boolean
}
/**
 * @description 双向数据绑定
 * @params
 *  value: any, 初始值，默认是空字符串 ''
 *
 *  filters: Func[], 可选， 过滤器，每次输入时都会调用这些过滤器，过滤器的返回值会作为新的 value
 *
 *  skipError: boolean 可选，默认是 false，如果为 true，则不会抛出错误，更新会被置为 null
 *
 * @description 内置过滤器
 * OnlyNumber： 只能输入整数数字
 *
 * @example
 * const [value, bindValue, setValue] = useModel('')
 * <Input {...bindValue} />
 */
export function useModel({ value, filters = [], skipError }: ModelOptions) {
  const [state, setState] = useState(value ?? "")
  useLayoutEffect(() => {
    if (typeof value !== "string") {
      return
    }
    setState(value ?? "")
  }, [value])

  function handleChange(v: any) {
    let newValue: string | null = null
    if (!isUndefined(v?.target?.value)) {
      newValue = v.target.value = compose<string>(...filters)(v.target.value)
    } else if (!isUndefined(v)) {
      newValue = compose<string>(...filters)(v)
    } else if (!skipError) {
      console.error(
        "useModel: 您绑定的事件对象可能并不是 input 一类的输入控件，请检查"
      )
    }
    setState(newValue)
  }

  return [state, { value: state, onChange: handleChange }, setState] as const
}

/**
 * @description 双向数据绑定的过滤器，只能输入整数
 */
export function OnlyNumber(value: string) {
  return value.replace(/[^\d]/g, "")
}

/**
 * @description 双向数据绑定，用于兼容 useItemState 的组件
 * @example
 * useItemState("input", "", {
 *  factory: withModel({
 *    filters: [OnlyNumber],
 *    skipError: false
 *  })
 * })
 */
export function withModel(options?: Omit<ModelOptions, "value">) {
  return function (value: any) {
    const [state, bind, setState] = useModel({
      value,
      filters: options?.filters,
      skipError: options?.skipError
    })
    return [state, setState, bind] as any
  }
}

export function useModelChecked(checked: boolean) {
  const [state, setState] = useState(checked)
  useLayoutEffect(() => {
    setState(checked)
  }, [checked])

  function handleChange(v: any) {
    let newValue: boolean
    if (isBoolean(v)) {
      newValue = v
    } else if (isBoolean(v?.target?.checked)) {
      newValue = v.target.checked
    } else {
      throw Error(
        "useModelChecked: 您绑定的事件对象可能并不是 checkbox 一类的输入控件，请检查"
      )
    }
    setState(newValue)
  }
  return [state, setState, { checked: state, onChange: handleChange }] as const
}

export function withModelChecked() {
  return function (checked: boolean) {
    const [state, setState, bind] = useModelChecked(checked)
    return [state, setState, bind] as any
  }
}
