export type BaseObject = {
  constructor: {
    name: string;
  };
};
export type BaseClass<T = BaseObject> = new (...args: any[]) => T;
