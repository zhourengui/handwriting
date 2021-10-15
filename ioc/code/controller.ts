import { getParams } from "./utils";

export default function controller<T extends new (...args: any[]) => any>(
  constructor: T
) {
  return class extends constructor {
    constructor(...args: any) {
      super(...args);
      const params = getParams(constructor);
      for (let i = 0; i < params.length; i++) {
        this[params[i]] = Reflect.getMetadata(
          String(constructor) + i,
          constructor
        );
      }
    }
  };
}
