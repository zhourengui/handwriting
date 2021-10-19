// 思路：
// 1. 克隆一个数组，目的为了存放每个值的上一个值的索引
// 2. 遍历数组，如果当前项比返回数组的最后一项还要大，直接push进去即可
// 3. 否则使用二分法，如果中间的值小于当前的，说明在右边，否则就是在左边，然后将返回数组的low索引的值修改成i，如果low大于0说明替换的位置不在第一位，所以修改克隆数组的当前项的值，这个值就是上一项的值
// 4. 最终获取到的数组是索引，从最后一项开始遍历，从原数组获取到值，然后下一个要取的索引就是克隆数组的值(cloneArr[low - 1])
// 5. 克隆数组的作用就是通过值去关联上一个值的索引位置

function getSequence(arr) {
  const arrLen = arr.length;
  const cloneArr = arr.slice();
  const res = [0];

  for (let i = 0; i < arrLen; i++) {
    const curr = arr[i];
    const top = res[res.length - 1];
    if (curr > arr[top]) {
      cloneArr[i] = top;
      res.push(i);
      continue;
    }

    let low = 0;
    let high = res.length;

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (arr[res[mid]] < curr) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    if (low > 0) {
      cloneArr[i] = res[low - 1];
    }
    res[low] = i;
  }

  let p = res.length;
  let v = res[p - 1];

  while (p > 0) {
    res[p - 1] = arr[v];
    v = cloneArr[v];
    p--;
  }

  return res;
}

// demo
console.error(
  getSequence([0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15])
);
