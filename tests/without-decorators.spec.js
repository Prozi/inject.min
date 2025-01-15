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

  describe('WHEN bind(Original, Override)', () => {
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

    it('THEN bind() does work', () => {
      const instance = DIContainer.get(Original);

      expect(instance.value.key).not.toBe('this is a base value');
    });

    it('AND getClass(Original) === Override work', () => {
      const Class = DIContainer.getClass(Original);

      expect(Class).toBe(Override);
    });
  });
});
