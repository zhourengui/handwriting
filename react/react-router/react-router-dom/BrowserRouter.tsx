import { ReactNode } from "react"
import createBrowserHistory from "../history"
import Router from "../react-router/Router"

interface BrowserRouterProps {
  children: ReactNode
}

const history = createBrowserHistory()

function BrowserRouter(props: BrowserRouterProps) {
  const { children } = props

  return <Router children={children} history={history} />
}

export default BrowserRouter
