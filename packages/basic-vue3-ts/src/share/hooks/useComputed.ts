import { onBeforeUnmount, readonly, ref, Ref, watchSyncEffect } from "vue"

export function useComputedSync<T>(getter: () => T): Readonly<Ref<T>> {
  const _ref = ref<any>(null)
  const stop = watchSyncEffect(() => {
    _ref.value = getter()
  })
  onBeforeUnmount(() => {
    stop()
  })
  return readonly(_ref)
}
