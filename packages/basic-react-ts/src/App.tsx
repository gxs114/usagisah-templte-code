import Loading from "@components/Loading"
import { AppRouter } from "@router/router"
import { FC } from "react"

export const App: FC = ({}) => {
  return (
    <>
      <AppRouter />
      <Loading />
    </>
  )
}
