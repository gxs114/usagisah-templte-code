import { Button } from "antd"
import { FC, useState } from "react"
import { ApiAJson } from "./api"

const Login: FC = () => {
  const [data, setData] = useState({})
  const handleRequest = async () => {
    const res = await ApiAJson()
    setData(res)
  }

  return (
    <div>
      <h1>login page</h1>

      <div> 请求结果：{JSON.stringify(data)} </div>
      <Button onClick={handleRequest}>login resolve public/a.json</Button>
    </div>
  )
}

export default Login
