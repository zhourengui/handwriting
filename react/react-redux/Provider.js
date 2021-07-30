import ReactReduxContext from "./Context"

function Provider(props) {
  const { store, children } = props

  return (
    <ReactReduxContext.Provider value={store}>
      {children}
    </ReactReduxContext.Provider>
  )
}

export default Provider
