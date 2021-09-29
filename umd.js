(function (global, factory) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    // CommonJS
    factory(exports);
  } else if (typeof define === "function" && define.amd) {
    // AMD
    factory(define(["exports"], factory));
  } else {
    // Browser
    factory((global.React = {}));
  }
})(this, function (exports) {
  // ...
});
