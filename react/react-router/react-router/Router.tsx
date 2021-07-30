import { ReactNode, useEffect, useState } from "react"
import { HistoryType } from "../history"
import RouterContext from "./RouterContext"

interface RouterProps {
  children: ReactNode
  history: HistoryType
}

function Router(props: RouterProps) {
  const { history, children } = props
  const [location, setLocation] = useState(history.location)

  useEffect(() => {
    const unlisten = history.listen((location) => setLocation(location))
    return () => {
      unlisten()
    }
  }, [])

  return (
    <RouterContext.Provider value={{ history, location }}>
      {children}
    </RouterContext.Provider>
  )
}

export default Router
