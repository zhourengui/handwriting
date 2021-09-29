// 屏蔽
const obj = { a: 1, b: 2 };
const obj1 = Object.create(obj);
obj.hasOwnProperty("a"); // false
