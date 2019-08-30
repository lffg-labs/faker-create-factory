import * as faker from 'faker';

export function createFactory<T = any>(
  schemaGenerator: (fakerInstance: typeof faker) => T
) {
  function generateMany(ammount: number): T[] {
    return Array.from({ length: ammount }).map(() => schemaGenerator(faker));
  }

  function generate() {
    return generateMany(1)[0];
  }

  return {
    generateMany,
    generate
  };
}
