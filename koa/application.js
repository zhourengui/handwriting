const http = require("http");
const EventEmitter = require("events");
const context = require("./context");

module.exports = class Application extends EventEmitter {
  constructor() {
    super();
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  async compose(context) {
    const createNext = (middleware, next) => async () =>
      await middleware(context, next);

    let next = () => Promise.resolve();
    let len = this.middlewares.length - 1;

    while (len >= 0) {
      next = createNext(this.middlewares[len], next);
      len--;
    }

    return await next();
  }

  createContext(req, res) {
    const nextContext = Object.create(context);
    nextContext.req = req;
    nextContext.res = res;
    nextContext.app = this;
    return nextContext;
  }

  onerror(err) {
    this.emit("error", err);
  }

  listen(...args) {
    const server = http.createServer((req, res) => {
      const context = this.createContext(req, res);

      this.compose(context).then(
        () => {},
        (err) => this.onerror(err)
      );
    });
    server.listen(...args);
  }
};
