function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    const Constructor = Buffer.allocUnsafe || buffer.constructor;
    return new Constructor(buffer.byteLength);
  } else {
    return buffer.slice();
  }
}
// demo
console.log(cloneBuffer(new Buffer.alloc(123)));
