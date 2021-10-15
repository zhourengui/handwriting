export default function createThunkMiddleware(...args) {
  return function ({ getState, dispatch }) {
    return function (next) {
      return function (action) {
        if (typeof action === "function") {
          return action(getState(), dispatch, ...args);
        }
        return next(action);
      };
    };
  };
}
