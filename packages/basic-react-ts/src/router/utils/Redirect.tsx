import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Redirect: FC<{ to: string }> = ({ to }) => {
  const push = useNavigate()
  useEffect(() => {
    push(to)
  }, [])
  return null
}
