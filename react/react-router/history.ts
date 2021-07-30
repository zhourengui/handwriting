
export type HandleType = (...args: any[]) => void

export type HistoryType = {
  listen: (listener: HandleType) => () => void
  push: (url: string) => void
  location: {
    pathname: string
  }
}

export type LocationType = {
  pathname: string
}

function createEvents() {
  let handlers: HandleType[] = []
  return {
    push(fn: HandleType) {
      handlers.push(fn)
      return function () {
        handlers = handlers.filter(handler => handler !== fn)
      }
    },
    call(...args: any[]) {
      for (const handler of handlers) {
        handler(...args)
      }
    }
  }
}

function createBrowserHistory() {
  const listeners = createEvents()
  let location = {
    pathname: window.location.pathname
  }

  function handlePopState() {
    const location = {
      pathname: window.location.pathname
    }
    listeners.call(location)
  }

  // 监听popstate事件
  // 注意pushState和replaceState并不会触发popstate
  // 但是浏览器的前进后退会触发popstate
  // 我们这里监听这个事件是为了处理浏览器的前进后退
  window.addEventListener("popstate", handlePopState)

  const history = {
    listen: (listener: HandleType) => {
      return listeners.push(listener)
    },
    push: (url: string) => {
      const history = window.history
      history.pushState(null, "", url)
      location = { pathname: url }
      listeners.call(location)
    },
    location
  }

  return history
}

export default createBrowserHistory