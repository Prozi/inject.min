import { BaseClass, BaseObject } from './types';
export declare class DIContainer {
  protected static overrides: Record<string, BaseClass>;
  protected static instances: Record<string, Record<string, BaseObject>>;
  /**
   * for future references overwrite Original class with Override
   * @param Original the class to search for in DIContainer
   * @param Override the extended class to replace that first one
   */
  static bind<T extends BaseObject>(
    Original: BaseClass<T>,
    Override: BaseClass<T>
  ): void;
  /**
   * get instance of Class/Override unique with constructor props
   * @param Class the class to search for in DIContainer
   * @param props the optional props for constructor of instance
   * @returns {instanceof Class}
   */
  static get<T extends BaseObject>(Class: BaseClass<T>, ...props: any[]): T;
  /**
   * get the Class/Override that was used with bind
   * @param Class the class to search for in DIContainer
   * @returns {class}
   */
  static getClass<T extends BaseObject>(Class: BaseClass<T>): BaseClass<T>;
  /**
   * the api to free class instances to prevent possible oom
   * @param Class the class to search for in DIContainer
   */
  static free<T extends BaseObject>(Class: BaseClass<T>): void;
  /**
   * creates property key string for index in records
   * @param props anything really
   * @returns {string}
   */
  protected static createPropertyKey(props?: any): string;
  /**
   * stringify anything or return {} if not possible
   * @param props anything really
   * @returns {string}
   */
  protected static tryStringify(props?: any): string;
}
