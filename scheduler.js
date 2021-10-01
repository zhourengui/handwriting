// js实现一个带并发限制的异步调度器schedule，保证同时运行的任务最多有两个

class Scheduler {
  constructor(maxConcurrent = 1) {
    this.maxConcurrent = maxConcurrent;
    this.working = 0;
    this.queue = [];
  }

  addTask(asyncTask) {
    return new Promise((resolve, reject) => {
      asyncTask.resolve = resolve;
      asyncTask.reject = reject;
      if (this.working >= this.maxConcurrent) {
        this.queue.push(asyncTask);
      } else {
        this.runTask(asyncTask);
      }
    });
  }

  runTask(asyncTask) {
    this.working++;
    Promise.resolve(asyncTask()).then(() => {
      this.working--;
      asyncTask.resolve();
      if (this.queue.length) {
        this.runTask(this.queue.shift());
      }
    }, asyncTask.reject);
  }
}

// demo
const scheduler = new Scheduler(3);
const sleep = (wait) => new Promise((resolve) => setTimeout(resolve, wait));

scheduler.addTask(() => sleep(4000)).then(() => console.log(1));
scheduler.addTask(() => sleep(2000)).then(() => console.log(2));
scheduler.addTask(() => sleep(3000)).then(() => console.log(3));
scheduler.addTask(() => sleep(900)).then(() => console.log(4));
