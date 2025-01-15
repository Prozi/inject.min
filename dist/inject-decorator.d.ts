import { BaseObject, BaseClass } from './types';
export declare function Inject<T extends BaseObject>(
  Class: BaseClass<T>,
  props?: any
): (target: any, propertyKey: any) => void;
