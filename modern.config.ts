import { moduleTools, defineConfig } from '@modern-js/module-tools';

export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: [{
    format: 'cjs',
    target: 'es6',
    buildType: 'bundleless',
    outDir: './dist/lib',
    dts: false,
    sourceMap: true,
  },
  {
    format: 'esm',
    target: 'es6',
    buildType: 'bundleless',
    outDir: './dist/es',
    dts: false,
    sourceMap: true,
  },
  {
    buildType: 'bundleless',
    outDir: './dist/types',
    dts: { only: true },
  }, {
    input: {index:'./website/index.tsx'},
    format: 'umd',
    platform: 'browser',
    buildType: 'bundle',
    outDir: './website/dist',
    autoExternal: false,
    copy: {
      patterns: [{
        from: '../README.md'
      }, {
        from: '../demo/README.md',
        to: 'demo/README.md'
      }]
    },
    externals: ['fs', 'path', 'perf_hooks']
  }]
});
