'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Inject = Inject;
const di_container_1 = require('./di-container');
function Inject(Class, props) {
  return function (target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
      get: () => di_container_1.DIContainer.get(Class, props),
      enumerable: true,
      configurable: true
    });
  };
}
