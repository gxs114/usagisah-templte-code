/**
 * 无限制的函数
 */
export type Func<P = any, R = any> = (...arg: Array<P>) => R
/**
 * 无限制的对象
 */
export type Obj = Record<any, any>
/**
 * 所有基本类型
 */
export type Primitive = null | undefined | string | number | boolean | symbol | bigint

/**
 * 将给行长度转换成同样长度的数组
 */
export type BuildAry<T extends number, R extends any[] = []> = R["length"] extends T ? R : BuildAry<T, [...R, any]>

type SplitHelper<S extends string, L extends string, R extends string[] = []> = S extends `${infer item}${L}${infer rest}` ? SplitHelper<rest, L, [...R, item]> : R
/**
 * 将字符串切割成数组
 */
export type Split<S extends string, L extends string = ""> = SplitHelper<S, L>

/**
 * 将对象拉平
 */
export type Flatten<T extends object> = { [K in keyof T]: T[K] }