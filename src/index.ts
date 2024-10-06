export type BaseObject = {
  constructor: { name: string };
};

export type BaseClass<T = BaseObject> = new (...args: any[]) => T;

export class DIContainer {
  protected static instances = new Map<string, unknown>();

  static get<T extends BaseObject>(
    Class: BaseClass<T>,
    props: Partial<T> = {}
  ): T {
    const className = Class.name;

    const propsKey = `${className}:${JSON.stringify(props)}`;
    if (!DIContainer.instances.has(propsKey)) {
      DIContainer.instances.set(propsKey, new Class(props));
    }

    return DIContainer.instances.get(propsKey) as T;
  }
}

export function Inject<T extends BaseObject>(
  inner: BaseClass<T>,
  props?: Partial<T>
) {
  return function (outer: Record<string, any>, field: string) {
    const instance = DIContainer.get(inner, props);

    outer[field] = instance;
  };
}
