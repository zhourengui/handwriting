function flatten(arr, depth) {
  return arr.reduce(
    (prev, next) =>
      prev.concat(depth > 0 ? (Array.isArray(next) ? next : [next]) : [next]),
    []
  );
}

// demo
console.log(flatten([1, 2, [3, [4, 5], [7, 8]]], 1));
