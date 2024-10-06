```bash
npm i inject.min --save
```

---

```ts
import { Inject } from 'inject.min';

class Example {
  value: string;

  constructor(props: { value: string }) {
    this.value = props.value || 'example';
  }
}

class Test {
  @Inject(Example) example1!: Example;
  @Inject(Example, { value: 'example2' }) example2!: Example;

  constructor() {
    console.log(this.example1.value); // example
    console.log(this.example2.value); // example2
  }
}

new Test();
```
