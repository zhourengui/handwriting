function flatten(arr, depth) {
  return arr.reduce(
    (prev, next) =>
      prev.concat(depth > 0 ? (Array.isArray(next) ? next : [next]) : [next]),
    []
  );
}

// 栈实现
// function flatten(arr) {
//   const stack = [...arr];
//   const res = [];

//   while (stack.length !== 0) {
//     const top = stack.pop();
//     if (Array.isArray(top)) {
//       stack.push(...top);
//     } else {
//       res.unshift(top);
//     }
//   }

//   return res;
// }

// demo
console.log(flatten([1, 2, [3, [4, 5], [7, 8]]], 1));
