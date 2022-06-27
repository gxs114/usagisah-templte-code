import { Button } from "antd"
import { useAtom } from "jotai"
import { FC } from "react"
import { numAtom } from "../store"

const Child3: FC = () => {
  const [num, setNum] = useAtom(numAtom)

  return (
    <div>
      <h1>
        child 3 --{" "}
        <Button type="primary" onClick={() => setNum(num + 1)}>
          ++ store num
        </Button>{" "}
      </h1>
    </div>
  )
}

export default Child3
