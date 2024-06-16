export type Constructor<T = {}> = new (...args: any[]) => T;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type InstanceTypeUnion<T extends Constructor[]> = UnionToIntersection<InstanceType<T[number]>>;

export type InstanceTypeOf<T extends Constructor[]> = T extends Array<Constructor<infer U>> ? U : never;