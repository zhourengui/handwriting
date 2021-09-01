// 手写JSON.stringify

JSON.stringify = function (input) {
  if (input === null || typeof input !== "object") return String(input);

  let res = [],
    curr = null,
    isObject = !Array.isArray(input);

  function padStr(origin, start, end) {
    const isObject = typeof origin === "object";
    return `${isObject ? "" : start}${JSON.stringify(origin)}${
      isObject ? "" : end
    }`;
  }

  for (const key in input) {
    if (Object.hasOwnProperty.call(input, key)) {
      curr = input[key];
      if (isObject) {
        res.push(`"${key}":${padStr(curr, '"', '"')}`);
      } else {
        res.push(padStr(curr, '"', '"'));
      }
    }
  }

  return isObject
    ? padStr(String(res), "{", "}")
    : padStr(String(res), "[", "]");
};

console.log(
  JSON.parse(
    JSON.stringify({
      name: "Alibaba",
      age: 30,
      other: { name: "heihei", age: 39 },
    })
  )
);

console.log(JSON.parse(JSON.stringify([{ name: "Alibaba" }])));
