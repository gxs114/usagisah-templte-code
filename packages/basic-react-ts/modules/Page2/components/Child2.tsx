import { useAtom } from "jotai"
import { FC } from "react"
import { numAtom } from "../store"

const Child2: FC = () => {
  const [num] = useAtom(numAtom)

  return (
    <div>
      <h1>child 2 -- {num}</h1>
    </div>
  )
}

export default Child2
