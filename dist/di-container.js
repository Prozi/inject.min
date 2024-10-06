'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DIContainer = void 0;
class DIContainer {
  static get(target, params) {
    const className = target.name;
    if (!this.instances.has(className)) {
      const instance = new target(params);
      this.instances.set(className, instance);
    }
    return this.instances.get(className);
  }
}
exports.DIContainer = DIContainer;
DIContainer.instances = new Map();
