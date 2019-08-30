'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var faker = require('faker');

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

exports.createFactory = createFactory;
