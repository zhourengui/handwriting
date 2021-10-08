// 时间复杂度是O(nlogn)
// 最长递增子序列
// 动态规划
// 贪心算法和二分法

[0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
function getSequence(arr) {
  const l = arr.length,
    p = arr.slice(),
    r = [0];

  let m, u, v, c;

  for (let i = 0; i < l; i++) {
    const arrI = arr[i];
    m = r[r.length - 1];
    if (arr[m] < arrI) {
      p[i] = m;
      r.push(i);
      continue;
    }

    u = 0;
    v = r.length;
    while (u < v) {
      c = Math.floor((u + v) / 2) | 0;
      if (arr[r[c]] < arrI) {
        u = c + 1;
      } else {
        v = c;
      }
    }

    if (u > 0) {
      p[i] = r[u - 1];
    }
    r[u] = i;
  }

  u = r.length;
  v = r[u - 1];

  while (u > 0) {
    r[u - 1] = arr[v];
    v = p[v];
    u--;
  }

  return r;
}

// demo
console.error(
  getSequence([0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15])
);
