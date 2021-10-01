// function flatten(arr, deepth) {
//   return arr.reduce(
//     (prev, next) =>
//       prev.concat(
//         Array.isArray(next)
//           ? deepth > 0
//             ? flatten(next, deepth - 1)
//             : [next]
//           : next
//       ),
//     []
//   );
// }

function flatten(arr, depth) {
  return arr.reduce(
    (prev, next) =>
      prev.concat(
        depth > 0
          ? flatten(Array.isArray(next) ? next : [next], depth - 1)
          : [next]
      ),
    []
  );
}

// demo
console.log(flatten([1, 2, [3, [4, 5], [7, 8]]], 1));
