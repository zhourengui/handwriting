// 手写Object.create原理
Object.create = function (proto, initVal = {}) {
  function F() {}
  F.prototype = proto;
  const res = new F();
  for (const key in initVal) {
    if (Object.hasOwnProperty.call(initVal, key)) {
      Object.defineProperty(
        res,
        key,
        typeof initVal[key] === "object" ? initVal[key] : {}
      );
    }
  }
  return res;
};

// demo
const obj = Object.create(
  { name: "Alibaba" },
  {
    age: {
      value: 1,
    },
  }
);
console.log(obj);
console.log(obj.age);
