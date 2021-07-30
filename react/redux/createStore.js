export default function createStore(reducer, initState, rewriteCreateStoreFn) {
  if (typeof rewriteCreateStoreFn === "function") {
    const nextCreateStore = rewriteCreateStoreFn(createStore)
    return nextCreateStore(reducer, initState)
  }

  let state = initState
  let listeners = []

  function subscribe(listener) {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  function getState() {
    return state
  }

  function replaceReducer(nextReducer) {
    reducer = nextReducer
    dispatch({
      type: "@@Redux: INIT_STATE",
    })
  }

  function dispatch(action) {
    state = reducer(state, action)
    for (const listener of listeners) {
      listener()
    }
  }

  dispatch({
    type: "@@Redux: INIT_STATE",
  })

  return {
    subscribe,
    getState,
    replaceReducer,
    dispatch,
  }
}
