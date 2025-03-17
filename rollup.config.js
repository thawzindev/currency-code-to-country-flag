import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfig: 'tsconfig.json',
    }),
    commonjs(),
    {
      name: 'copy-assets',
      generateBundle() {
        // Copy SVG files to dist
        const fs = require('fs');
        const path = require('path');
        
        function copyFolderSync(from, to) {
          if (!fs.existsSync(to)) {
            fs.mkdirSync(to, { recursive: true });
          }
          
          fs.readdirSync(from).forEach(element => {
            const source = path.join(from, element);
            const target = path.join(to, element);
            
            if (fs.lstatSync(source).isDirectory()) {
              copyFolderSync(source, target);
            } else {
              fs.copyFileSync(source, target);
            }
          });
        }
        
        copyFolderSync('src/assets', 'dist/assets');
      }
    },
    terser(),
  ],
  external: ['react', 'react-dom'],
};