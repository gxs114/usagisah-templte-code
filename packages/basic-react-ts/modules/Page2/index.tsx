import { FC } from "react"
import Child1 from "./components/Child1"
import Child2 from "./components/Child2"
import Child3 from "./components/Child3"

const Page2: FC = () => {
  return (
    <div>
      <h1>page 2 -- 状态管理演示</h1>
      <Child1 />
      <Child2 />
      <Child3 />
    </div>
  )
}

export default Page2
