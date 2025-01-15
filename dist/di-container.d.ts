import {
  ClassName,
  BaseClass,
  InstancesPerProps,
  BaseObject,
  Props,
  PropsKey
} from './types';
export declare class DIContainer {
  protected static overrides: Record<ClassName, BaseClass>;
  protected static instances: Record<ClassName, InstancesPerProps>;
  static get<T extends BaseObject>(Class: BaseClass<T>, props?: Props): T;
  static getClass<T extends BaseObject>(Class: BaseClass<T>): BaseClass<T>;
  static bind<T extends BaseObject>(
    Original: BaseClass<T>,
    Override: BaseClass<T>
  ): void;
  protected static createPropertyKey(props?: Props): PropsKey;
  protected static tryStringify(props?: Props): string;
}
