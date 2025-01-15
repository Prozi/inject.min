'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DIContainer = void 0;
class DIContainer {
  /**
   * for future references overwrite Original class with Override
   * @param Original the class to search for in DIContainer
   * @param Override the extended class to replace that first one
   */
  static bind(Original, Override) {
    DIContainer.overrides[Original.name] = Override;
  }
  /**
   * get instance of Class/Override unique with constructor props
   * @param Class the class to search for in DIContainer
   * @param props the optional props for constructor of instance
   * @returns {instanceof Class}
   */
  static get(Class, ...props) {
    const propertyKey = DIContainer.createPropertyKey(props);
    if (!DIContainer.instances[Class.name]) {
      DIContainer.instances[Class.name] = {};
    }
    if (!DIContainer.instances[Class.name][propertyKey]) {
      const ResolvedClass = DIContainer.getClass(Class);
      DIContainer.instances[Class.name][propertyKey] = new ResolvedClass(props);
    }
    return DIContainer.instances[Class.name][propertyKey];
  }
  /**
   * get the Class/Override that was used with bind
   * @param Class the class to search for in DIContainer
   * @returns {class}
   */
  static getClass(Class) {
    const overwrite = this.overrides[Class.name];
    return overwrite || Class;
  }
  /**
   * the api to free class instances to prevent possible oom
   * @param Class the class to search for in DIContainer
   */
  static free(Class) {
    DIContainer.instances[Class.name] = {};
  }
  /**
   * creates property key string for index in records
   * @param props anything really
   * @returns {string}
   */
  static createPropertyKey(props) {
    if (typeof props !== 'undefined') {
      return DIContainer.tryStringify(props);
    }
    return 'undefined';
  }
  /**
   * stringify anything or return {} if not possible
   * @param props anything really
   * @returns {string}
   */
  static tryStringify(props) {
    try {
      return JSON.stringify(props);
    } catch (_err) {
      return '{}';
    }
  }
}
exports.DIContainer = DIContainer;
DIContainer.overrides = {};
DIContainer.instances = {};
