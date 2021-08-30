// 手写Object.create原理
Object.create = function (proto, value) {
  const obj = new Object(value);
  obj.__proto__ = proto;
  return obj;
};

// demo
const obj = Object.create({ name: "Alibaba" }, { age: 30 });
console.log(obj);
console.log(obj.name);
