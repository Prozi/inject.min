export type BaseObject = {
  constructor: {
    name: string;
  };
};
export type BaseClass<T = BaseObject> = new (...args: any[]) => T;
export declare class DIContainer {
  protected static instances: Map<string, unknown>;
  static get<T extends BaseObject>(
    Class: BaseClass<T>,
    props?: Record<string, any>
  ): T;
}
export declare function Inject<T extends BaseObject>(
  inner: BaseClass<T>,
  props?: Record<string, any>
): (outer: Record<string, any>, field: string) => void;
