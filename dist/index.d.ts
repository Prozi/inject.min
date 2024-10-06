export type BaseObject = {
  constructor: {
    name: string;
  };
};
export type BaseClass<T = BaseObject> = new (...args: any[]) => T;
export declare class DIContainer {
  protected static instances: Map<string, unknown>;
  static get<T extends BaseObject>(Class: BaseClass<T>, props?: Partial<T>): T;
}
export declare function Inject<T extends BaseObject>(
  inner: BaseClass<T>,
  props?: Partial<T>
): (outer: Record<string, any>, field: string) => void;
