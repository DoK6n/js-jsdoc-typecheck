export class Module {
  id;
  imports;
  controllers;
  providers;

  /** @param {{imports: Array, controllers: Array, providers: Array}} moduleOption */
  constructor(moduleOption) {
    this.imports = moduleOption.imports;
    this.controllers = moduleOption.controllers;
    this.providers = moduleOption.providers;
  }
}

function readOnlyObject(target) {
  const handler = {
    get: function (target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      if (Object(result) === result) {
        return readOnlyObject(result);
      }
      return result;
    },
    set: NOPE,
    defineProperty: NOPE,
    deleteProperty: NOPE,
    preventExtensions: NOPE,
    setPrototypeOf: NOPE,
  };

  return new Proxy(target, handler);

  function NOPE() {
    throw new Error("can't modify read-only view");
  }
}

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
module.exports = { DIContainer, Module };
