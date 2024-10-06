'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Inject = Inject;
require('reflect-metadata');
const di_container_1 = require('./di-container');
function Inject(params) {
  return function (target, propertyKey) {
    const classType = Reflect.getMetadata('design:type', target, propertyKey);
    target[propertyKey] = di_container_1.DIContainer.get(classType, params);
  };
}
