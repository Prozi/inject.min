import { Inject, DIContainer } from '../src';

class Example {
  value!: string;

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
  @Inject(Example) example!: Example;
  @Inject(Example2, 'example2') example2!: Example2;
  @Inject(Example, { param: 'example3' }) example3!: Example;

  constructor() {
    console.log(this.example.value); // example
    console.log(this.example2.value); // example2
    console.log(this.example3.value); // example3
  }
}

class Test2 {
  @Inject(Example) example!: Example;
  @Inject(Example2, 'different') example2!: Example2;
  @Inject(Example, { param: 'example3' }) example3!: Example;

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

class Original {
  name = 'original';
}

class Override extends Original {
  name = 'override';
}

class TestOverride {
  @Inject(Original) test!: Original;

  constructor() {
    DIContainer.bind(Original, Override);

    const Class = DIContainer.getClass(Original);
    const instance = DIContainer.get(Original);

    console.log(instance.name); // 'override'
    console.log(Class === Override); // true
  }
}

new TestOverride();
