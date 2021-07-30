// js实现一个带并发限制的异步调度器schedule，保证同时运行的任务最多有两个
class Scheduler {
  constructor(max = 2) {
    this.max = max;
    this.unwork = [];
    this.working = [];
  }

  addTask(asyncTask) {
    return new Promise((resolve) => {
      asyncTask.resolve = resolve;
      if (this.working.length >= this.max) {
        this.unwork.push(asyncTask);
      } else {
        this.runTask(asyncTask);
      }
    });
  }

  runTask(asyncTask) {
    this.working.push(asyncTask);
    asyncTask().then(() => {
      asyncTask.resolve();
      if (this.unwork.length) {
        this.runTask(this.unwork.shift());
      }
    });
  }
}

// demo
const scheduler = new Scheduler();
const sleep = (wait) => new Promise((resolve) => setTimeout(resolve, wait));

scheduler.addTask(() => sleep(4000)).then(() => console.log(1));
scheduler.addTask(() => sleep(2000)).then(() => console.log(2));
scheduler.addTask(() => sleep(3000)).then(() => console.log(3));
scheduler.addTask(() => sleep(900)).then(() => console.log(4));
