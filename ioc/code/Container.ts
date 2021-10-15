interface Service<T extends new (...args: unknown[]) => unknown> {
  single: boolean;
  instance?: InstanceType<T>;
  fn: () => InstanceType<T>;
}

class Container {
  private services = new Map<symbol, Service<any>>();

  public bind<T extends new (...args: unknown[]) => unknown>(
    key: symbol,
    fn: T,
    single: boolean = false
  ) {
    return this.services.set(key, {
      single: single,
      fn: () => new fn(),
    });
  }

  public delete(key: symbol) {
    return this.services.delete(key);
  }

  public use(key: symbol) {
    const service = this.services.get(key);
    if (!service) {
      throw new Error("找不到Service");
    }
    if (!service.single) {
      return service.fn();
    }

    service.instance = service.fn();
    return service.instance;
  }
}

const container = new Container();

export default container;
