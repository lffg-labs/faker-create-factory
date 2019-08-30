import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  plugins: [typescript({ clean: true })],
  output: [
    { file: 'build/faker-create-factory-cjs.js', format: 'cjs' },
    { file: 'build/faker-create-factory.mjs', format: 'es' }
  ]
};
