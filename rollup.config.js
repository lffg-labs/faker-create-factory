import { join } from 'path';
import typescript from 'rollup-plugin-typescript2';

const out = join.bind(undefined, __dirname, 'build');

export default {
  input: './faker-create-factory.ts',
  plugins: [
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    })
  ],
  output: [
    { file: out('faker-create-factory-cjs.js'), format: 'cjs' },
    { file: out('faker-create-factory.mjs'), format: 'es' }
  ],
  external: ['faker']
};
