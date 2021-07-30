import React from "react"
import { HistoryType, LocationType } from "../history"

const RouterContext = React.createContext<{
  history: HistoryType | null
  location: LocationType | null
}>({
  history: null,
  location: null,
})

export default RouterContext
