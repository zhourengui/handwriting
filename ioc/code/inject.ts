import container from "./container";

export default function inject(key: symbol) {
  return function <T extends new (...args: any[]) => any>(
    target: T,
    targetKey: string,
    index: number
  ) {
    if (!targetKey) {
      Reflect.defineMetadata(
        String(target) + index,
        container.use(key),
        target
      );
    }
  };
}
