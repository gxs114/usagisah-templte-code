import { FC, useLayoutEffect, useRef, useState } from "react"
import { useTransition, animated } from "@react-spring/web"
import { Button } from "antd"

const Page1: FC = () => {
  const [n, set] = useState(0)
  const [proxy, setProxy] = useState([n])
  const timer = useRef(0)

  useLayoutEffect(() => {
    const old = proxy[0]
    if (old !== n) {
      setProxy([n, old])
      timer.current = setTimeout(() => setProxy([n]), 0)
    }

    return () => clearTimeout(timer.current)
  }, [n])

  const transitions = useTransition(proxy, {
    from: { opacity: 0, y: "-600%" },
    enter: { opacity: 1, y: "0%" },
    leave: { opacity: 0, y: "600%" }
  })

  return (
    <div>
      <h1>page1 page -- 计数器动画</h1>

      <Button onClick={() => set(n + 1)}>add</Button>

      <div style={{ position: "absolute", left: "40%" }}>
        {transitions((style, item) => (
          <animated.div style={{ ...style }}>{item}</animated.div>
        ))}
      </div>
    </div>
  )
}

export default Page1
