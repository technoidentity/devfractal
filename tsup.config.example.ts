import { defineConfig, Options } from 'tsup'
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions'

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  format: ['esm', 'cjs'],
  dts: true,
  minify: true,
  sourcemap: true,
  clean: true,
  entry: ['src/index.ts'],
  // target: 'es2020',
  // entry: ['src/**/*.tsx'],
  // external: ['react'],
  ...options,
}))

// example configs from `react-query`

export function modernConfig(opts: Partial<Options>) {
  return {
    entry: opts.entry,
    format: ['cjs', 'esm'],
    target: ['chrome91', 'firefox90', 'edge91', 'safari15', 'ios15', 'opera77'],
    outDir: 'build/modern',
    dts: true,
    sourcemap: true,
    clean: true,
    esbuildPlugins: [esbuildPluginFilePathExtensions({ esmExtension: 'js' })],
  }
}

export function legacyConfig(opts: Partial<Options>) {
  return {
    entry: opts.entry,
    format: ['cjs', 'esm'],
    target: ['es2020', 'node16'],
    outDir: 'build/legacy',
    dts: true,
    sourcemap: true,
    clean: true,
    esbuildPlugins: [esbuildPluginFilePathExtensions({ esmExtension: 'js' })],
  }
}
