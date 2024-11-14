export type Props = any;

export type PropsKey = string;

export type ClassName = string;

export type BaseObject = {
  constructor: { name: ClassName };
};

export type BaseClass<T = BaseObject> = new (...args: Props[]) => T;

export type InstancesPerProps = Record<PropsKey, BaseObject>;

export class DIContainer {
  protected static classes: Record<ClassName, BaseClass> = {};
  protected static overrides: Record<ClassName, BaseClass> = {};
  protected static instances: Record<ClassName, InstancesPerProps> = {};

  static get<T extends BaseObject>(Class: BaseClass<T>, props?: Props): T {
    const propertyKey = DIContainer.createPropertyKey(Class, props);

    if (!DIContainer.instances[Class.name]) {
      DIContainer.instances[Class.name] = {};
    }

    if (!DIContainer.instances[Class.name][propertyKey]) {
      const ResolvedClass = DIContainer.resolveClass(Class);

      DIContainer.instances[Class.name][propertyKey] = new ResolvedClass(props);
    }

    return DIContainer.instances[Class.name][propertyKey] as T;
  }

  static bind<T extends BaseObject>(
    Target: BaseClass<T>,
    Source: BaseClass<T>
  ): void {
    DIContainer.overrides[Target.name] = Source;
  }

  protected static resolveClass<T extends BaseObject>(
    Class: BaseClass<T>
  ): BaseClass<T> {
    const overwrite = this.overrides[Class.name];

    return (overwrite || Class) as BaseClass<T>;
  }

  protected static createPropertyKey<T extends BaseObject>(
    Class: BaseClass<T>,
    props?: Props
  ): PropsKey {
    return `${typeof props}:${DIContainer.tryStringify(props)}`;
  }

  protected static tryStringify(props?: Props): string {
    try {
      return JSON.stringify(props);
    } catch (_err) {
      return '{}';
    }
  }
}

export function Inject<T extends BaseObject>(Class: BaseClass<T>, props?: any) {
  return function (parent: Record<string, Props>, propertyKey: string) {
    Object.defineProperty(parent, propertyKey, {
      get: () => DIContainer.get(Class, props)
    });
  };
}
