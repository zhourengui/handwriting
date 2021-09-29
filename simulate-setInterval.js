// 使用setTimeout模拟setInterval

function setInterval(handler, wait) {
  let timer = null;
  const rec = () => {
    timer = setTimeout(() => {
      clearTimeout(timer);
      handler();
      if (!timer._onTimeout) {
        rec();
      }
    }, wait);
  };

  rec();
}

setInterval(() => console.log("setInterval"), 2000);
