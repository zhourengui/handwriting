import { MouseEventHandler, ReactElement, useContext } from "react"
import RouterContext from "../react-router/RouterContext"

interface LinkProps {
  to: string
  children: ReactElement | string
  style?: Object
  className?: string
}

function Link(props: LinkProps) {
  const { history } = useContext(RouterContext)
  const { children, to, className, style } = props
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault()
    history?.push(to)
  }
  return (
    <a href={to} className={className} style={style} onClick={handleClick}>
      {children}
    </a>
  )
}

export default Link
