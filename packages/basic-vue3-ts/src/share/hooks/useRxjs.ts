import { onBeforeUnmount } from "vue"
import { Subject, Observable, map } from "rxjs"

/**
 * @description 工具操作符，用来给 useRxEvent 做占位符的
 */
export function identity<T>(x: T): T {
  return x
}

/**
 * @description 工具操作符，快速获取 e.target.value
 */
export function pickTargetValue<T>(input$: any): Observable<T> {
  return input$.pipe(map((e: any) => e.target.value))
}

/**
 * @description 工具操作符，快速获取 e.value
 */
export function pickValue<T>(input$: any): Observable<T> {
  return input$.pipe(map((e: any) => e.target.value))
}

/**
 * @description 工具操作符，快速获取 e.target.value
 */
export function pickChecked(input$: any): Observable<boolean> {
  return input$.pipe(map((e: any) => e.target.checked))
}

/**
 * @description 适配 rxjs 的 fromEvent
 * @param {} (input: Observable<any>) => Observable<P>
 * @param {} (arg: P) => void |
 * {
 *  next: (arg: P) => void,
 *  error: (arg: any) => void,
 *  complete: () => void
 * }
 *
 * @example const [onClick, click$] = useRxEvent(identity, (e) => console.log(e))
 *
 * @example const [onClick, click$] = useRxEvent(
 *  (input$) => input$.pipe( map(() => false) ),
 *  e => console.log(e)
 * )
 */
export function useRxEvent<P>(
  pipes: (input: Observable<any>) => Observable<P>,
  fn:
    | ((arg: P) => void)
    | {
        next?: (arg: P) => void
        error?: (arg: any) => void
        complete?: () => void
      }
) {
  const input$ = new Subject<P>()
  pipes(input$).subscribe(fn as any)
  onBeforeUnmount(() => {
    input$.complete()
  })
  return [(arg: any) => input$.next(arg), input$] as const
}
