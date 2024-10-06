'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
const _1 = require('.');
class Example {
  constructor(props) {
    this.value =
      (props === null || props === void 0 ? void 0 : props.value) || 'example';
  }
}
class Test {
  constructor() {
    console.log(this.example1.value); // example
    console.log(this.example2.value); // example2
  }
}
__decorate(
  [(0, _1.Inject)(Example), __metadata('design:type', Example)],
  Test.prototype,
  'example1',
  void 0
);
__decorate(
  [
    (0, _1.Inject)(Example, { value: 'example2' }),
    __metadata('design:type', Example)
  ],
  Test.prototype,
  'example2',
  void 0
);
class Test2 {
  constructor() {
    console.log(this.example1.value); // example
    console.log(this.example2.value); // example2
  }
}
__decorate(
  [(0, _1.Inject)(Example), __metadata('design:type', Example)],
  Test2.prototype,
  'example1',
  void 0
);
__decorate(
  [
    (0, _1.Inject)(Example, { value: 'example2' }),
    __metadata('design:type', Example)
  ],
  Test2.prototype,
  'example2',
  void 0
);
new Test();
new Test2();
