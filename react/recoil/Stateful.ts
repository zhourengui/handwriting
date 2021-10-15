interface Subscribe {
  disconnect: () => void;
}

export default class Stateful<T> {
  private listeners = new Set<(value: T) => void>();

  constructor(protected value: T) {}

  public subscribe(callback: (value: T) => void): Subscribe {
    this.listeners.add(callback);

    return {
      disconnect: () => {
        this.listeners.delete(callback);
      },
    };
  }

  private emit() {
    for (const listener of [...this.listeners]) {
      listener(this.value);
    }
  }

  public shapshot() {
    return this.value;
  }

  protected update(value: T) {
    if (this.value !== value) {
      this.value = value;
      this.emit();
    }
  }
}
