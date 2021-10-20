// 使用setTimeout模拟setInterval

function setInterval(handler, wait) {
  let timer = setTimeout(() => {
    clearTimeout(timer);
    handler();
    timer = setTimeout(handler, wait);
  }, wait);
}

setInterval(() => console.log("setInterval"), 2000);
