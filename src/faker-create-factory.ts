import * as faker from 'faker';
import { DeepPartial } from './types';

type OverridesType<T> =
  | DeepPartial<T>
  | ((fakerInstance: typeof faker) => DeepPartial<T>);

export function createFactory<T = any>(
  schemaGenerator: (fakerInstance: typeof faker, index: number) => T
) {
  function generateMany(
    ammount: number,
    customOverrides?: OverridesType<T>
  ): T[] {
    const overrides = !customOverrides
      ? {}
      : 'call' in customOverrides
      ? customOverrides(faker)
      : customOverrides;

    return Array.from({ length: ammount }).map((_, index) =>
      Object.assign(schemaGenerator(faker, index), overrides)
    );
  }

  function generate(overrides?: OverridesType<T>) {
    return generateMany(1, overrides)[0];
  }

  return {
    generateMany,
    generate
  };
}
