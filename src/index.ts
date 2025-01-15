export type Props = any;

export type PropsKey = string;

export type ClassName = string;

export type BaseObject = {
  constructor: { name: ClassName };
};

export type PropertyKey =
  | any
  | {
      name: string;
      private: boolean;
      static: boolean;
    };

export type BaseClass<T = BaseObject> = new (...args: Props[]) => T;

export type InstancesPerProps = Record<PropsKey, BaseObject>;

export class DIContainer {
  protected static overrides: Record<ClassName, BaseClass> = {};
  protected static instances: Record<ClassName, InstancesPerProps> = {};

  static get<T extends BaseObject>(Class: BaseClass<T>, props?: Props): T {
    const propertyKey = DIContainer.createPropertyKey(props);

    if (!DIContainer.instances[Class.name]) {
      DIContainer.instances[Class.name] = {};
    }

    if (!DIContainer.instances[Class.name][propertyKey]) {
      const ResolvedClass = DIContainer.getClass(Class);

      DIContainer.instances[Class.name][propertyKey] = new ResolvedClass(props);
    }

    return DIContainer.instances[Class.name][propertyKey] as T;
  }

  static getClass<T extends BaseObject>(
    Class: BaseClass<T>
  ): BaseClass<T> {
    const overwrite = this.overrides[Class.name];

    return (overwrite || Class) as BaseClass<T>;
  }

  static bind<T extends BaseObject>(
    Original: BaseClass<T>,
    Override: BaseClass<T>
  ): void {
    DIContainer.overrides[Original.name] = Override;
  }

  protected static createPropertyKey(props?: Props): PropsKey {
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
  return function (target: any, propertyKey: any) {
    Object.defineProperty(target, propertyKey, {
      get: () => DIContainer.get(Class, props),
      enumerable: true,
      configurable: true
    });
  };
}
