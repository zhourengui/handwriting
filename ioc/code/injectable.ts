import container from "./container";

export default function injectable(key: symbol) {
  return function <T extends new (...args: any[]) => any>(constructor: T) {
    container.bind(key, constructor, false);
    return class extends constructor {};
  };
}
