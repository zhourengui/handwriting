import { Atom } from ".";
import Stateful from "./Stateful";

type SelectorGenerator<V> = (context: { get: <T>(dep: Atom<T>) => T }) => V;

export default class Selector<T> extends Stateful<T> {
  constructor(private readonly generator: SelectorGenerator<T>) {
    super(undefined as any);
    this.value = generator({ get: (dep: Atom<any>) => this.addSub(dep) });
  }

  private registeredDeps = new Set<Atom<any>>();

  private addSub(dep: Atom<any>) {
    if (!this.registeredDeps.has(dep)) {
      this.registeredDeps.add(dep);
      dep.subscribe(() => this.updateSelector());
    }

    return dep.shapshot();
  }

  public updateSelector() {
    this.update(this.generator({ get: (dep: Atom<any>) => this.addSub(dep) }));
  }

  static createSelector<T>(value: {
    key: string | symbol | number;
    get: SelectorGenerator<T>;
  }) {
    return new Selector(value.get);
  }
}
