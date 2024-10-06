# inject.min

### install

```bash
npm i inject.min --save
```

### example

```ts
import { Inject } from 'inject.min';

class Example {
  value: string;

  constructor(props: { param: string }) {
    this.value = props?.param || 'example';
  }
}

class Test {
  @Inject(Example) example!: Example;
  @Inject(Example, { param: 'example2' }) example2!: Example;

  constructor() {
    console.log(this.example.value); // example
    console.log(this.example2.value); // example2
  }
}

class Test2 {
  @Inject(Example) example!: Example;
  @Inject(Example, { param: 'different' }) example2!: Example;

  constructor() {
    console.log(this.example.value); // example
    console.log(this.example2.value); // different
  }
}

class Test3 extends Test {}

const test = new Test(); // example, example2
const test2 = new Test2(); // example, different
const test3 = new Test3(); // example, example2

console.log(test.example === test2.example); // true
console.log(test.example2 === test2.example2); // false
console.log(test.example2 === test3.example2); // true
```
