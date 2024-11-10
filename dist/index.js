'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DIContainer = void 0;
exports.Inject = Inject;
class DIContainer {
  static get(Class, props) {
    const classPropsKey = DIContainer.createKey(Class, props);
    if (!DIContainer.instances.has(classPropsKey)) {
      DIContainer.instances.set(classPropsKey, new Class(props));
    }
    return DIContainer.instances.get(classPropsKey);
  }
  static createKey(Class, props) {
    return `${Class.name}(${typeof props}:${DIContainer.tryStringify(props)})`;
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
DIContainer.instances = new Map();
function Inject(Class, props) {
  return function (parent, propertyKey) {
    Object.defineProperty(parent, propertyKey, {
      get: () => DIContainer.get(Class, props)
    });
  };
}
