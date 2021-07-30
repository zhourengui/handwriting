const http = require("http")
const EventEmitter = require("events")
const context = require("./context")

module.exports = class Application {
  constructor() {
    this.middlewares = []
  }

  use(middleware) {
    this.middlewares.push(middleware)
  }

  createContext(req, res) {
    const nextContext = Object.create(context)
    nextContext.req = req
    nextContext.res = res
    nextContext.app = this
    return nextContext
  }

  compose() {
    return async (ctx) => {
      const createNext = (middleware, next) => async () =>
        await middleware(ctx, next)

      let next = () => Promise.resolve()
      let len = this.middlewares.length

      while (len > 0) {
        next = createNext(this.middlewares[len - 1], next)
        len--
      }

      return await next()
    }
  }

  onerror(error) {
    this.emit("error", error)
  }

  callback() {
    return (req, res) => {
      const ctx = this.createContext(req, res)
      const fn = this.compose()

      fn(ctx)
        .then(() => {})
        .catch((error) => this.onerror(error))
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}
