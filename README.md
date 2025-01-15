# inject.min

[<img src="https://img.shields.io/npm/v/inject.min?style=for-the-badge&color=success" alt="npm version" />](https://www.npmjs.com/package/inject.min?activeTab=versions)
[<img src="https://img.shields.io/circleci/build/github/Prozi/inject.min/master?style=for-the-badge" alt="build status" />](https://app.circleci.com/pipelines/github/Prozi/inject.min)

### disclaimer

super easy and super small dependency injection - all that you need

- no need to register
- can override
- can use inject
- can use decorators

### example without decorators

```ts
import { DIContainer } from 'inject.min';

class Original {
  name = 'original';
}

class Override extends Original {
  name = 'override';
}

class TestOverride {
  constructor() {
    DIContainer.bind(Original, Override);

    const Class = DIContainer.getClass(Original);
    const instance = DIContainer.get(Original);

    console.log(instance.name); // 'override'
    console.log(Class === Override); // true
  }
}

new TestOverride();
```

### to use decorators (optional)

modify your `tsconfig.json`

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

### example using decorators

```ts
import { Inject } from 'inject.min';

class Example {
  value: string;

  constructor(props?: { param: string }) {
    this.value = props?.param || 'example';
  }
}

class Example2 extends Example {
  constructor(param: string) {
    super({ param });
  }
}

class Test {
  @Inject(Example) example: Example;
  @Inject(Example2, 'example2') example2: Example2;
  @Inject(Example, { param: 'example3' }) example3: Example;

  constructor() {
    console.log(this.example.value); // example
    console.log(this.example2.value); // example2
    console.log(this.example3.value); // example3
  }
}

class Test2 {
  @Inject(Example) example: Example;
  @Inject(Example2, 'different') example2: Example2;
  @Inject(Example, { param: 'example3' }) example3: Example;

  constructor() {
    console.log(this.example.value); // example
    console.log(this.example2.value); // different
    console.log(this.example3.value); // example3
  }
}

class Test3 extends Test {}

const test = new Test(); // example, example2, example3
const test2 = new Test2(); // example, different, example3
const test3 = new Test3(); // example, example2, example3

console.log(test.example === test2.example); // true
console.log(test.example2 === test2.example2); // false
console.log(test.example2 === test3.example2); // true
```

### api

[DIContainer Documentation](https://prozi.github.io/inject.min/classes/DIContainer.html)

### install

```bash
npm i inject.min --save
```

### license

MIT
