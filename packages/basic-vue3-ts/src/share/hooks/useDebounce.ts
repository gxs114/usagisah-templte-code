/**
 * @description 防抖函数，只有间隔指定时间才会执行
 * @param {Function} func 需要防抖的函数
 * @param {number} delay 间隔时间
 *
 * @example
 * const fn = useDebounce((props: string) => {
 *  console.log("debounce", props)
 * })
 *
 * fn("hello")
 */
export function useDebounce<P extends any[]>(
  fn: (...args: P) => any,
  delay = 700
) {
  let timer: any = null
  return (...args: P) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
