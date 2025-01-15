import { DIContainer } from './di-container';
import { BaseObject, BaseClass } from './types';

export function Inject<T extends BaseObject>(Class: BaseClass<T>, props?: any) {
  return function (target: any, propertyKey: any) {
    Object.defineProperty(target, propertyKey, {
      get: () => DIContainer.get(Class, props),
      enumerable: true,
      configurable: true
    });
  };
}
