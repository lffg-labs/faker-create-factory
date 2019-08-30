import * as faker from 'faker';
export declare function createFactory<T = any>(schemaGenerator: (fakerInstance: typeof faker) => T): {
    generateMany: (ammount: number) => T[];
    generate: () => T;
};
