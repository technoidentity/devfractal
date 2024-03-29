import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'text'],
    },
    includeSource: ['src/**/*.{tsx,ts}'],
  },
})
