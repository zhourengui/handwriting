import Stateful from "./Stateful";

export default class Atom<T> extends Stateful<T> {
  private constructor(value: T) {
    super(value);
  }

  public setState(value: T) {
    this.update(value)
  }

  static createAtom<T>(value: { key: string | symbol | number, default: T }) {
    return new Atom(value.default)
  }
}