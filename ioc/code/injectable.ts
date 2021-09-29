import { Container } from ".";

export function injectable(key: symbol) {
  return function <T extends new (...args: any[]) => any>(constructor: T) {
    Container.getInstance().bind(key, constructor, false);
    return class extends constructor {};
  };
}
