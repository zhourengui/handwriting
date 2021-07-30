// @ts-nocheck
class Sandbox {
  protected globalAddPropertyMap: Map<string | number | symbol, any> =
    new Map();
  protected globalBeforeUpdatePropertyMap: Map<string | number | symbol, any> =
    new Map();
  protected globalAfterUpdatePropertyMap: Map<string | number | symbol, any> =
    new Map();

  constructor(public name: string, protected proxy?: Object) {
    const globalAddPropertyMap = this.globalAddPropertyMap;
    const globalBeforeUpdatePropertyMap = this.globalBeforeUpdatePropertyMap;
    const globalAfterUpdatePropertyMap = this.globalAfterUpdatePropertyMap;
    const prevProxy = proxy || Object.create({});

    this.proxy = new Proxy(prevProxy, {
      get(_, name) {
        return (window as any)[name];
      },
      set(_, name, value) {
        if (prevProxy.hasOwnProperty && !prevProxy.hasOwnProperty(name)) {
          globalAddPropertyMap.set(name, value);
        }

        if (!globalBeforeUpdatePropertyMap.has(name)) {
          globalBeforeUpdatePropertyMap.set(name, (window as any)[name]);
        }

        globalAfterUpdatePropertyMap.set(name, value);

        (window as any)[name] = value;

        return true;
      },
      deleteProperty(target: any, p: string | symbol) {
        delete target[p];
        return true;
      },
      has() {
        return true;
      },
    });
  }

  public active() {
    for (let [key, val] of [...this.globalAfterUpdatePropertyMap]) {
      (window as any)[key] = val;
    }
  }

  public inactive() {
    for (let [key, val] of [...this.globalBeforeUpdatePropertyMap]) {
      (window as any)[key] = val;
    }

    for (let [key] of [...this.globalAddPropertyMap]) {
      delete (window as any)[key];
    }
  }

  public getProxy() {
    return this.proxy;
  }

  public setProperty(key: string | number | symbol, val: any) {
    (this.proxy as any)[key] = val;
  }
}

var app = new Sandbox("App");
app.setProperty("main", "Tencent");
console.log(app.getProxy().main);
app.inactive();
console.log(app.getProxy().main);
app.active();
console.log(app.getProxy().main);
