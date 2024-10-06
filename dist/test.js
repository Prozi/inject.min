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
      (props === null || props === void 0 ? void 0 : props.param) || 'example';
  }
}
class Example2 extends Example {
  constructor(param) {
    super({ param });
  }
}
class Test {
  constructor() {
    console.log(this.example.value); // example
    console.log(this.example2.value); // example2
    console.log(this.example3.value); // example3
  }
}
__decorate(
  [(0, _1.Inject)(Example), __metadata('design:type', Example)],
  Test.prototype,
  'example',
  void 0
);
__decorate(
  [(0, _1.Inject)(Example2, 'example2'), __metadata('design:type', Example2)],
  Test.prototype,
  'example2',
  void 0
);
__decorate(
  [
    (0, _1.Inject)(Example, { param: 'example3' }),
    __metadata('design:type', Example)
  ],
  Test.prototype,
  'example3',
  void 0
);
class Test2 {
  constructor() {
    console.log(this.example.value); // example
    console.log(this.example2.value); // different
    console.log(this.example3.value); // example3
  }
}
__decorate(
  [(0, _1.Inject)(Example), __metadata('design:type', Example)],
  Test2.prototype,
  'example',
  void 0
);
__decorate(
  [(0, _1.Inject)(Example2, 'different'), __metadata('design:type', Example2)],
  Test2.prototype,
  'example2',
  void 0
);
__decorate(
  [
    (0, _1.Inject)(Example, { param: 'example3' }),
    __metadata('design:type', Example)
  ],
  Test2.prototype,
  'example3',
  void 0
);
class Test3 extends Test {}
const test = new Test(); // example, example2, example3
const test2 = new Test2(); // example, different, example3
const test3 = new Test3(); // example, example2, example3
console.log(test.example === test2.example); // true
console.log(test.example2 === test2.example2); // false
console.log(test.example2 === test3.example2); // true
