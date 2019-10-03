import * as faker from 'faker';
import { DeepPartial } from './types';

type Callback<T> = (fakerInstance: typeof faker, index: number) => T;

type OverridesType<T> = DeepPartial<T> | Callback<DeepPartial<T>>;

export function createFactory<T = any>(schemaGenerator: Callback<T>) {
  function generateMany(
    ammount: number,
    customOverrides?: OverridesType<T>
  ): T[] {
    return Array.from({ length: ammount }).map((_, index) =>
      Object.assign(
        schemaGenerator(faker, index),

        // Get custom overrides, passing the index to the callback function.
        typeof customOverrides === 'function'
          ? (customOverrides as Callback<DeepPartial<T>>)(faker, index)
          : customOverrides
      )
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
