import { useAtom } from "jotai"
import { FC } from "react"
import { numAtom } from "../store"

const Child1: FC = () => {
  const [num] = useAtom(numAtom)

  return (
    <div>
      <h1>child 1 -- {num}</h1>
    </div>
  )
}

export default Child1
