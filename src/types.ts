export type Props = any;

export type PropsKey = string;

export type ClassName = string;

export type BaseObject = {
  constructor: { name: ClassName };
};

export type PropertyKey =
  | any
  | {
      name: string;
      private: boolean;
      static: boolean;
    };

export type BaseClass<T = BaseObject> = new (...args: Props[]) => T;

export type InstancesPerProps = Record<PropsKey, BaseObject>;
