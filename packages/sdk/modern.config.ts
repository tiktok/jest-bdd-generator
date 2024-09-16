import { moduleTools, defineConfig } from '@modern-js/module-tools';

export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: [
    {
      format: 'cjs',
      target: 'es6',
      buildType: 'bundleless',
      outDir: './dist/lib',
      dts: false,
      sourceMap: true
    },
    {
      format: 'esm',
      target: 'es6',
      buildType: 'bundleless',
      outDir: './dist/es',
      dts: false,
      sourceMap: true
    },
    {
      buildType: 'bundleless',
      outDir: './dist/types',
      dts: { only: true }
    }
  ]
});
