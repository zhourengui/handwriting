let _obj = {
    isNumber: "Number",
    isString: "String",
    isUndefined: "Undefined",
  },
  _toString = _obj.toString,
  _type = {};

for (const key in _obj) {
  if (Object.hasOwnProperty.call(_obj, key)) {
    _type[key] = function (val) {
      return _toString.call(val) === `[object ${_obj[key]}]`;
    };
  }
}

// demo
console.error(_type.isUndefined(undefined));
