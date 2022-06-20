import { isBoolean } from "./validate"
import { onUnmounted, ref } from "vue"

export function useFullScreen(_full?: boolean) {
  if (isBoolean(_full)) {
    _full
      ? document.exitFullscreen()
      : document.fullscreenElement!.requestFullscreen()
  }

  const full = ref(_full ?? !!document.fullscreenElement)
  const handleFullScreen = () => {
    full.value = !!document.fullscreenElement
  }
  const toggleFullScreen = () => {
    full.value
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen()
  }

  document.addEventListener("fullscreenchange", handleFullScreen)
  onUnmounted(() => {
    document.removeEventListener("fullscreenchange", handleFullScreen)
  })

  return [full, toggleFullScreen] as const
}
