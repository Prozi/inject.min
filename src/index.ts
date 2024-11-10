export type BaseObject = {
  constructor: { name: string };
};

export type BaseClass<T = BaseObject> = new (...args: any[]) => T;

export class DIContainer {
  protected static instances = new Map<string, unknown>();

  static get<T extends BaseObject>(Class: BaseClass<T>, props?: any): T {
    const classPropsKey = DIContainer.createKey(Class, props);

    if (!DIContainer.instances.has(classPropsKey)) {
      DIContainer.instances.set(classPropsKey, new Class(props));
    }

    return DIContainer.instances.get(classPropsKey) as T;
  }

  protected static createKey<T extends BaseObject>(
    Class: BaseClass<T>,
    props?: any
  ): string {
    return `${Class.name}(${typeof props}:${DIContainer.tryStringify(props)})`;
  }

  protected static tryStringify(props?: any): string {
    try {
      return JSON.stringify(props);
    } catch (_err) {
      return '{}';
    }
  }
}

export function Inject<T extends BaseObject>(Class: BaseClass<T>, props?: any) {
  return function (parent: Record<string, any>, propertyKey: string) {
    Object.defineProperty(parent, propertyKey, {
      get: () => DIContainer.get(Class, props)
    });
  };
}
