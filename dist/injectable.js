'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Injectable = Injectable;
const di_container_1 = require('./di-container');
function Injectable(target) {
  di_container_1.DIContainer.get(target);
}
