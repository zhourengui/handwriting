export default function combineReducer(reducers) {
  let keys = Object.keys(reducers)
  return function (state, action) {
    let nextState = {}
    for (const key of keys) {
      if (Object.hasOwnProperty.call(keys, key)) {
        const reducer = reducers[key]
        const prevState = state[key]
        nextState[key] = reducer(prevState, action)
      }
    }

    return nextState
  }
}
