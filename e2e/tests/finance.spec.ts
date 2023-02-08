import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/ctc')

  // Expect a title "to contain" a substring.
})
