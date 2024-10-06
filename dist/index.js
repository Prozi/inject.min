'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DIContainer = void 0;
exports.Inject = Inject;
class DIContainer {
  static get(Class, props) {
    const className = Class.name;
    const classPropsKey = `${className}:${JSON.stringify(props || {})}`;
    if (!DIContainer.instances.has(classPropsKey)) {
      DIContainer.instances.set(classPropsKey, new Class(props));
    }
    return DIContainer.instances.get(classPropsKey);
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
