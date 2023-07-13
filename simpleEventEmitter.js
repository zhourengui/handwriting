// 实现一个 SimpleEventEmitter，支持 trigger、once、on、off 方法

class SimpleEventEmitter {
  constructor() {
    this.event = new Map();
    this.onceEvent = new Map();
  }

  on(eventName, handler) {
    this.setEvent(eventName, handler, this.event);
  }

  once(eventName, handler) {
    this.setEvent(eventName, handler, this.onceEvent);
  }

  off(eventName, handler) {
    if (handler) {
      this.delEventHandler(eventName, handler, this.event);
      this.delEventHandler(eventName, handler, this.onceEvent);
    } else {
      this.delEvent(eventName, this.event);
      this.delEvent(eventName, this.onceEvent);
    }
  }

  trigger(eventName, ...args) {
    const eventHandlers = this.getEventHandlers(eventName, this.event);
    const onceEventHandlers = this.getEventHandlers(eventName, this.onceEvent);
    for (const handler of eventHandlers.concat(onceEventHandlers)) {
      handler.apply(this, args);
    }
    this.delEvent(eventName, this.onceEvent);
  }

  setEvent(eventName, handler, eventMap) {
    eventMap.set(
      eventName,
      new Set(this.getEventHandlers(eventName, eventMap).concat(handler))
    );
  }

  delEvent(eventName, eventMap) {
    eventMap.delete(eventName);
  }

  delEventHandler(eventName, handler, eventMap) {
    eventMap.get(eventName).delete(handler);
  }

  getEventHandlers(eventName, eventMap) {
    return Array.from(eventMap.get(eventName) || []).filter((i) => i);
  }
}

const simpleEventEmitter = new SimpleEventEmitter();
simpleEventEmitter.on('eventOne', (paramOne, paramTwo) => {
  console.log('eventOne');
  console.log(paramOne);
  console.log(paramTwo);
});
simpleEventEmitter.trigger('eventOne', 'Rengui', 'Zhou');

// logs
// eventOne
// Rengui
// Zhou
