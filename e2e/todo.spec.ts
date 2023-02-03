import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:3001/')
  await page.getByRole('radiogroup').getByText('Completed').click()
  await page.getByText('Incomplete').click()
  await page
    .getByRole('row', { name: 'delectus aut autem' })
    .getByRole('button', { name: 'Edit' })
    .click()
  await page
    .getByRole('row', { name: 'delectus aut autem' })
    .getByRole('button', { name: 'Delete' })
    .click()
  await page
    .getByRole('row', { name: 'fugiat veniam minus' })
    .getByRole('button', { name: 'Delete' })
    .click()
  await page
    .getByText(
      'TitleCompletedquis ut nam facilis et officia quiEditDeletelaboriosam mollitia et',
    )
    .click()
  await page
    .getByRole('row', {
      name: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    })
    .getByRole('button', { name: 'Edit' })
    .click()
  await page.getByText('Incomplete').click()
  await page.getByRole('radiogroup').getByText('Completed').click()
  await page.getByText('All').click()
  await page
    .getByRole('row', {
      name: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    })
    .getByRole('button', { name: 'Edit' })
    .click()
})
