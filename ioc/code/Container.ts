interface IContainer<T extends new (...args: any[]) => any> {
  single?: boolean;
  instance?: InstanceType<T>;
  fn: () => T;
}

export class Container {
  private containers = new Map<symbol, IContainer<any>>();
  private static instance: Container | undefined;

  bind(key: symbol, Fn: new (...args: any[]) => any, single: boolean) {
    const callback = () => new Fn();
    const _instance = { fn: callback, single, instance: null };
    this.containers.set(key, _instance);
  }

  delete(key: symbol) {
    this.containers.delete(key);
  }

  use(key: symbol) {
    const container = this.containers.get(key);
    if (container) {
      if (container.single && container.instance === null) {
        container.instance = container.fn();
      }
      return container.single ? container.instance : container.fn();
    }

    throw new Error("找不到容器");
  }

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    return (this.instance = new Container());
  }
}
