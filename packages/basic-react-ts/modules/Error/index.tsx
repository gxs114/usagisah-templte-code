import { css } from "@emotion/react"
import { FC } from "react"
import { Link } from "react-router-dom"
import { Button } from "antd"

const Error: FC = () => {
  return (
    <div
      css={css({
        a: {
          marginRight: "1rem"
        }
      })}
    >
      <h1>error page</h1>
      <Button>
        <Link to="/">root</Link>
      </Button>
      <Button>
        <Link to="/system">system</Link>
      </Button>
      <Button>
        <Link to="/login">login</Link>
      </Button>
    </div>
  )
}

export default Error
