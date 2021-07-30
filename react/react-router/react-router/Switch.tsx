import { ReactNode, useContext } from "react"
import RouterContext from "./RouterContext"

interface SwitchProps {
  children: ReactNode
}

function Switch(props: SwitchProps) {
  const { location } = useContext(RouterContext)
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children]

  for (const child of children) {
    const { props } = child as any
    const { path, component } = props
    if (location?.pathname.match(path)) {
      return component
    }
  }
  return null
}

export default Switch
