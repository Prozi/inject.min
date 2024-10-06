export type BaseObject = {
  constructor: { name: string };
};

export type BaseClass<T = BaseObject> = new (...args: any[]) => T;

export type Props = Record<string, any>;

export class DIContainer {
  protected static instances = new Map<string, unknown>();

  static get<T extends BaseObject>(Class: BaseClass<T>, props?: Props): T {
    const className = Class.name;
    const classPropsKey = `${className}:${JSON.stringify(props)}`;

    if (!DIContainer.instances.has(classPropsKey)) {
      DIContainer.instances.set(classPropsKey, new Class(props));
    }

    return DIContainer.instances.get(classPropsKey) as T;
  }
}

export function Inject<T extends BaseObject>(
  Class: BaseClass<T>,
  props?: Props
) {
  return function (parent: Props, prop: string) {
    const instance = DIContainer.get(Class, props);

    parent[prop] = instance;
  };
}
