import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'packages/*/vitest.config.ts',
  'apps/*/vitest.config.ts',
  'libs/*/vitest.config.ts',
  'experimental/*/vitest.config.ts',
  'examples/*/vitest.config.ts',
  'starters/*/vitest.config.ts',
])
