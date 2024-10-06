'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DIContainer = void 0;
exports.Inject = Inject;
class DIContainer {
  static get(Class, props = {}) {
    const className = Class.name;
    const propsKey = `${className}:${JSON.stringify(props)}`;
    if (!DIContainer.instances.has(propsKey)) {
      DIContainer.instances.set(propsKey, new Class(props));
    }
    return DIContainer.instances.get(propsKey);
  }
}
exports.DIContainer = DIContainer;
DIContainer.instances = new Map();
function Inject(inner, props) {
  return function (outer, field) {
    const instance = DIContainer.get(inner, props);
    outer[field] = instance;
  };
}
