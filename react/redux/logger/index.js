export default function logger() {
  return function (next) {
    return function (action) {
      console.log("@Redux Actoin 🐢", action.type)
      next(action)
    }
  }
}
