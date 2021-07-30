import compose from "./compose.js"

export default function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer, initState) {
      const store = createStore(reducer, initState)
      const extraStore = {
        getState: store.getState,
        dispatch: store.dispatch,
      }

      const chains = middlewares.map((middleware) => middleware(extraStore))

      const dispatch = compose(...chains)(store.dispatch)

      return {
        ...store,
        dispatch,
      }
    }
  }
}
