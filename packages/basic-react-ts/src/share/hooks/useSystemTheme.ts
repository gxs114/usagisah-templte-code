import { useLayoutEffect, useState } from "react"

/**
 * @description: 获取当前系统主题
 *
 * @return
 * [
 *
 *  isDark: boolean 是否是暗黑模式,
 *  theme: "light" | "dark"  主题
 *
 * ]
 */
export function useSystemTheme() {
  const [theme, setTheme] = useState<[boolean, 'light' | 'dark']>([
    false,
    'light'
  ])
  useLayoutEffect(() => {
    const handleTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      setTheme([e.matches, e.matches ? 'dark' : 'light'])
    }
    const match = window.matchMedia('(prefers-color-scheme: dark)')
    handleTheme(match)

    match.addEventListener('change', handleTheme)
    return () => {
      match.removeEventListener('change', handleTheme)
    }
  }, [])

  return theme
}
