import { ReactElement, useContext } from "react"
import RouterContext from "./RouterContext"

export interface RouteProps {
  path: string
  component: ReactElement
}

function Route(props: RouteProps) {
  const { location } = useContext(RouterContext)
  const { path, component } = props
  let pathname = location?.pathname
  return pathname?.match(path) ? component : null
}

export default Route
