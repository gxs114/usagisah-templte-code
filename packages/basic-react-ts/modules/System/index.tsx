import { useQuery, useRoute } from "@router/utils"
import { FC } from "react"
import { Link, Outlet } from "react-router-dom"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { Button } from "antd"

const SystemContainer = styled.div(() => ({
  ".title": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60px",
    h1: {
      fontSize: "2rem",
      fontWeight: "bold"
    },
    ".nav": {
      a: {
        marginRight: "1rem"
      }
    }
  }
}))

const System: FC = () => {
  console.log("当前路由的参数", useQuery())
  console.log("当前路由的节点信息", useRoute())

  return (
    <SystemContainer>
      <div className="title">
        <h1>system page</h1>

        <div className="nav">
          <Button type="link">
            <Link to="/system/page1">page1</Link>
          </Button>
          <Button type="link">
            <Link to="/system/page2">page2</Link>
          </Button>
        </div>
      </div>
      <main
        css={css({
          height: "calc(100vh - 60px)",
          border: "1px solid red"
        })}
      >
        <Outlet />
      </main>
    </SystemContainer>
  )
}

export default System
