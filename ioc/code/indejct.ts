import { Container } from "./Container";

export function inject(key: symbol) {
  return <T extends new (...args: any[]) => any>(
    target: T,
    targetKey: string,
    index: number
  ) => {
    if (!targetKey) {
      Reflect.defineMetadata(key, Container.getInstance().use(key), target);
    }
  };
}
