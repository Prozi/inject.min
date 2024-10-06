export type BaseObject = {
  constructor: {
    name: string;
  };
};
export type BaseClass<T = BaseObject> = new (...args: any[]) => T;
export type Props = Record<string, any>;
export declare class DIContainer {
  protected static instances: Map<string, unknown>;
  static get<T extends BaseObject>(Class: BaseClass<T>, props?: Props): T;
}
export declare function Inject<T extends BaseObject>(
  Class: BaseClass<T>,
  props?: Props
): (parent: Props, prop: string) => void;
