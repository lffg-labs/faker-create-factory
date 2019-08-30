/**
 * DeepPartial Type
 *
 * @see https://github.com/piotrwitek/utility-types/blob/7f54af8dafd4780eb18315c693197e30773a4eab/src/mapped-types.ts#L523
 */

export type DeepPartial<T> = T extends Function
  ? T
  : T extends (infer U)[]
  ? DeepPartialArray<U>
  : T extends object
  ? DeepPartialObject<T>
  : T | undefined;

interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}

type DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> };
