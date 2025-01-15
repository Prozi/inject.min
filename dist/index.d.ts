export type Props = any;
export type PropsKey = string;
export type ClassName = string;
export type BaseObject = {
  constructor: {
    name: ClassName;
  };
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
export declare class DIContainer {
  protected static overrides: Record<ClassName, BaseClass>;
  protected static instances: Record<ClassName, InstancesPerProps>;
  static get<T extends BaseObject>(Class: BaseClass<T>, props?: Props): T;
  static bind<T extends BaseObject>(
    Original: BaseClass<T>,
    Override: BaseClass<T>
  ): void;
  protected static resolveClass<T extends BaseObject>(
    Class: BaseClass<T>
  ): BaseClass<T>;
  protected static createPropertyKey(props?: Props): PropsKey;
  protected static tryStringify(props?: Props): string;
}
export declare function Inject<T extends BaseObject>(
  Class: BaseClass<T>,
  props?: any
): (target: any, propertyKey: any) => void;
