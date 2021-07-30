class Subject<T> {
  constructor(private state?: T, public observers: Observer<T>[] = []) {}

  setState(state: T) {
    this.state = state
  }

  getState() {
    return this.state
  }

  notify() {
    for (const observer of this.observers) {
      observer.update()
    }
  }
}

class Observer<T> {
  constructor(private subject: Subject<T>) {
    this.subject.observers.push(this)
  }

  update() {
    console.error(this.subject.getState())
  }
}
const subject = new Subject()
const observer1 = new Observer(subject)
const observer2 = new Observer(subject)

subject.setState({ nickname: "Tencent" })

subject.notify()