function MyInstanceof(A, B) {
  let target = B.prototype;
  let proto = A;

  while (proto) {
    if (target === proto) {
      return true;
    }

    proto = proto.__proto__;
  }

  return false;
}
// demo
console.error(MyInstanceof([], Array));
