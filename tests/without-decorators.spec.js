const { DIContainer } = require('../dist');

describe('GIVEN DIContainer', () => {
  it('THEN get(Class) work', () => {
    class GetExample {
      value = {
        whatever: 'foo'
      };
    }

    const instance = DIContainer.get(GetExample);

    expect(instance.value.whatever).toBe('foo');
  });

  it('THEN bind(Original, Override) work', () => {
    class Original {
      value = {
        key: 'this is a base value'
      };
    }

    class Override extends Original {
      value = {
        key: 'override value or anything in this class'
      };
    }

    DIContainer.bind(Original, Override);

    const instance = DIContainer.get(Original);

    expect(instance.value.key).not.toBe('this is a base value');
  });
});
