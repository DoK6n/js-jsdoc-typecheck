const { readonly } = require('./utils');

export class Module {
  id;
  imports;
  controllers;
  providers;

  /** @param {{imports: Array, controllers: Array, providers: Array}} moduleOption */
  constructor(moduleOption) {
    this.imports = readonly(moduleOption.imports);
    this.controllers = readonly(moduleOption.controllers);
    this.providers = readonly(moduleOption.providers);
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
