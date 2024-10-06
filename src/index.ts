export type BaseObject = {
  constructor: { name: string };
};

export type BaseClass<T = BaseObject> = new (...args: any[]) => T;

export class DIContainer {
  protected static instances = new Map<string, unknown>();

  static get<T extends BaseObject>(
    Class: BaseClass<T>,
    props?: Record<string, any>
  ): T {
    const className = Class.name;
    const classPropsKey = `${className}:${JSON.stringify(props)}`;

    if (!DIContainer.instances.has(classPropsKey)) {
      DIContainer.instances.set(classPropsKey, new Class(props));
    }

    return DIContainer.instances.get(classPropsKey) as T;
  }
}

export function Inject<T extends BaseObject>(
  inner: BaseClass<T>,
  props?: Record<string, any>
) {
  return function (outer: Record<string, any>, field: string) {
    const instance = DIContainer.get(inner, props);

    outer[field] = instance;
  };
}
