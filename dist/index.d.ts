export type BaseObject = {
  constructor: {
    name: string;
  };
};
export type BaseClass<T = BaseObject> = new (...args: any[]) => T;
export declare class DIContainer {
  protected static instances: Map<string, unknown>;
  static get<T extends BaseObject>(Class: BaseClass<T>, props?: any): T;
}
export declare function Inject<T extends BaseObject>(
  Class: BaseClass<T>,
  props?: any
): (parent: Record<string, any>, prop: string) => void;
