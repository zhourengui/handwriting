import { Container } from ".";
import { getParams } from "./utils";

export function controller<T extends new (...args: any[]) => any>(
  constructor: T
) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      const params = getParams(constructor);
      for (const key of params) {
        this[key] = Reflect.getMetadata(Symbol.for(key), constructor);
      }
    }
  };
}
