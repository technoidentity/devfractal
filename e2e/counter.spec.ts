import { test } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:3001/')
  await page.getByRole('button', { name: '+' }).click({
    clickCount: 4,
  })
  await page.getByText('+-').click()
  await page.getByRole('button', { name: '-' }).click({
    clickCount: 3,
  })
  await page.getByRole('button', { name: '-' }).click()
  await page.getByRole('button', { name: '-' }).click({
    clickCount: 4,
  })
  await page.getByRole('button', { name: '-' }).click()
})
