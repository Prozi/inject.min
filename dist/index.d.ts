export type Props = any;
export type PropsKey = string;
export type ClassName = string;
export type BaseObject = {
  constructor: {
    name: ClassName;
  };
};
export type BaseClass<T = BaseObject> = new (...args: Props[]) => T;
export type InstancesPerProps = Record<PropsKey, BaseObject>;
export declare class DIContainer {
  protected static classes: Record<ClassName, BaseClass>;
  protected static overrides: Record<ClassName, BaseClass>;
  protected static instances: Record<ClassName, InstancesPerProps>;
  static get<T extends BaseObject>(Class: BaseClass<T>, props?: Props): T;
  static bind<T extends BaseObject>(
    Target: BaseClass<T>,
    Source: BaseClass<T>
  ): void;
  protected static resolveClass<T extends BaseObject>(
    Class: BaseClass<T>
  ): BaseClass<T>;
  protected static createPropertyKey<T extends BaseObject>(
    Class: BaseClass<T>,
    props?: Props
  ): PropsKey;
  protected static tryStringify(props?: Props): string;
}
export declare function Inject<T extends BaseObject>(
  Class: BaseClass<T>,
  props?: any
): (parent: Record<string, Props>, propertyKey: string) => void;
