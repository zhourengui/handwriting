const rewire = require("rewire");
const JSON_stringify = rewire("./JSON.stringify");
const stringify = JSON_stringify.__get__("stringify");
// @ponicode
describe("stringify", () => {
  test("0", () => {
    let result = stringify({ key3: -5.48, 3: 100 });
    expect(result).toEqual({ 3: "100", key3: "-5.48" });
  });

  test("1", () => {
    let result = stringify({ key3: 1, 3: -100 });
    expect(result).toEqual({ 3: "-100", key3: "1" });
  });

  test("2", () => {
    let result = stringify({ key3: 100, 3: 100 });
    expect(result).toEqual({ 3: "100", key3: "100" });
  });

  test("3", () => {
    let result = stringify({ key3: -5.48, 3: 1 });
    expect(result).toEqual({ 3: "1", key3: "-5.48" });
  });

  test("4", () => {
    let result = stringify({ key3: 1, 3: 0 });
    expect(result).toEqual({ 3: "0", key3: "1" });
  });

  test("5", () => {
    let result = stringify({});
    expect(result).toEqual({});
  });
});
