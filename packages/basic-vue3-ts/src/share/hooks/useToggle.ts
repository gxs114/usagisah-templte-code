import { computed, onUnmounted, Ref, ref, watch } from "vue"

/**
 * @description 参数支持4种类型：boolean, number, string, Array<any>
 * 返回值类型为 [当前响应式的值, 自动切换值函数, 数组情况下内部的原始数组（用于修改原始值）]
 *
 * const [value, toggle] = useToggle(true)
 * const [value, toggle] = useToggle(1)
 * const [value, toggle] = useToggle("hello")
 * const [value, toggle, source] = useToggle([1, 2, 3])
 */
export function useToggle(initialValue: boolean): ReturnType<typeof withBoolean>
export function useToggle(initialValue: number): ReturnType<typeof withNumber>
export function useToggle<T extends string>(
  initialValue: T
): [Ref<string>, () => void, Ref<string>]
export function useToggle<T>(
  initialValue: T[]
): [Ref<T>, () => void, Ref<any[]>]
export function useToggle(initialValue: any): any {
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
      return withArray(initialValue.split(""))
    default:
      throw Error("useToggle: value must be boolean or array or number")
  }
}

function withBoolean(value: boolean) {
  const bool = ref(value)
  const toggle = () => (bool.value = !bool.value)
  return [bool, toggle] as const
}

function withNumber(value: number) {
  const num = ref(value)
  const toggle = () => num.value++
  return [num, toggle] as const
}

function withArray<T>(value: T[]) {
  const arr = ref(value)
  const cur = ref(0)
  const result = computed(() => arr.value[cur.value] as T)
  const toggle = () => (cur.value += 1)
  const unWatch = watch(
    () => arr,
    () => {
      cur.value = 0
    },
    { flush: "sync" }
  )

  onUnmounted(() => unWatch())

  return [result, toggle, arr] as const
}
