import { css } from "@emotion/react"
import { gLoading } from "@store/globalStore"
import { Spin } from "antd"
import { useAtom } from "jotai"
import { FC, useEffect, useState } from "react"

export interface LoadingOption {
  open: boolean
}

let setLoading: React.Dispatch<React.SetStateAction<LoadingOption>> | null

export const useLoading = () => {
  return (open: boolean) => setLoading!(config => ({ ...config, open }))
}

const Loading: FC<Partial<LoadingOption>> = props => {
  const [config, setConfig] = useState<LoadingOption>(
    Object.assign(
      {
        open: false
      },
      props
    )
  )

  useEffect(() => {
    setLoading = setConfig
    return () => {
      setLoading = null
    }
  }, [])
  return config.open ? (
    <div
      css={css({
        position: "fixed",
        inset: "0",
        background: "rgba(255,255,255,.9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 3000,
        ".content": {
          marginBottom: "5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold"
        }
      })}
    >
      <div className="content">
        <Spin size="large" />
        {/* <p>loading</p> */}
      </div>
    </div>
  ) : null
}

export default Loading
