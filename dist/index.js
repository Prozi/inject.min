'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DIContainer = void 0;
exports.Inject = Inject;
class DIContainer {
  static get(Class, props) {
    const propertyKey = DIContainer.createPropertyKey(props);
    if (!DIContainer.instances[Class.name]) {
      DIContainer.instances[Class.name] = {};
    }
    if (!DIContainer.instances[Class.name][propertyKey]) {
      const ResolvedClass = DIContainer.resolveClass(Class);
      DIContainer.instances[Class.name][propertyKey] = new ResolvedClass(props);
    }
    return DIContainer.instances[Class.name][propertyKey];
  }
  static bind(Original, Override) {
    DIContainer.overrides[Original.name] = Override;
  }
  static resolveClass(Class) {
    const overwrite = this.overrides[Class.name];
    return overwrite || Class;
  }
  static createPropertyKey(props) {
    return `${typeof props}:${DIContainer.tryStringify(props)}`;
  }
  static tryStringify(props) {
    try {
      return JSON.stringify(props);
    } catch (_err) {
      return '{}';
    }
  }
}
exports.DIContainer = DIContainer;
DIContainer.overrides = {};
DIContainer.instances = {};
function Inject(Class, props) {
  return function (target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
      get: () => DIContainer.get(Class, props),
      enumerable: true,
      configurable: true
    });
  };
}
