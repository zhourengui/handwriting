function swap(arr, i1, i2) {
  if (i1 === i2) return;
  [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
}

function heapSort(arr) {
  const len = arr.length;
  if (len <= 1) return arr;

  for (let i = Math.floor(len / 2); i >= 0; i--) {
    replace(arr, i, len - 1);
  }

  for (let i = 0; i < len; i++) {
    swap(arr, 0, len - 1 - i);
    replace(arr, 0, len - 2 - i);
  }

  return arr;
}

function replace(arr, i, size) {
  const l = i * 2 + 1;
  const r = i * 2 + 2;
  let largest = i;
  if (l <= size && arr[l] > arr[largest]) {
    largest = l;
  }

  if (r <= size && arr[r] > arr[largest]) {
    largest = r;
  }
  if (largest !== i) {
    swap(arr, largest, i);
    replace(arr, largest, size);
  }
}

console.log(heapSort([5, 2, 12, 2, 134, 1, 3, 34, 4, 6, 1, 3, 4]));
