import * as faker from 'faker';

function createFactory(schemaGenerator) {
    function generateMany(ammount) {
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

export { createFactory };
