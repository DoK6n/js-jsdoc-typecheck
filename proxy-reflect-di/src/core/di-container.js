class DIContainer {
  constructor() {
    this.dependencies = {};
    this.proxy = new Proxy(this.dependencies, {
      get: (target, property) => {
        if (!Reflect.has(target, property)) {
          throw new Error(`No dependency registered for ${property}`);
        }
        return Reflect.get(target, property);
      },
      set: (target, property, value) => {
        if (Reflect.has(target, property)) {
          throw new Error(`Dependency ${property} is already registered`);
        }
        Reflect.set(target, property, value);
        return true;
      },
    });
  }

  register(name, dependency) {
    this.proxy[name] = dependency;
  }

  get(name) {
    return this.proxy[name];
  }
}
module.exports = { DIContainer };
