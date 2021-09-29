let channel = new MessageChannel(),
  frameTime = 1000 / 60,
  pendingCallback,
  frameDeadline,
  timeRemaining = () => frameDeadline - performance.now();

channel.port2.onmessage = function () {
  const diffTime = timeRemaining();
  let didTimeout = diffTime < 0;
  if (diffTime > 0) {
    pendingCallback({ didTimeout, timeRemaining });
  }
};

function requestIdleCallback(callback) {
  requestAnimationFrame((rafTime) => {
    frameDeadline = rafTime + frameTime;
    pendingCallback = callback;
    channel.port1.postMessage("requestIdleCallback");
  });
}

// demo
requestIdleCallback(({ didTimeout, timeRemaining }) => {
  console.log("剩余时间", timeRemaining());
  console.log("是否过期", didTimeout);
});
