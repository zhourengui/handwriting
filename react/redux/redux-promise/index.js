export default function promiseMiddleware({ dispatch }) {
  return function (next) {
    return function (action) {
      if (action instanceof Promise) {
        return action.then(dispatch)
      }

      return action.payload instanceof Promise
        ? action.payload.then((result) =>
            dispatch({ ...action, payload: result })
          )
        : next(action)
    }
  }
}
