import { test, expect } from '@playwright/test'

test.describe('contacts router example', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
    expect(page.locator('#root')).not.toBeNull()
  })

  test('Root Layout', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3000/')

    const addNewButton = page.getByRole('link', { name: 'New' })
    const searchBar = page.getByRole('searchbox')

    await expect(page.getByRole('listitem')).toHaveCount(10)
    await expect(searchBar).toBeEnabled()
    await expect(addNewButton).toHaveAttribute('href', '/contacts/add')
    await expect(addNewButton).toBeEnabled()

    await searchBar.type('test string')
    await expect(searchBar).toHaveValue('test string')

    await addNewButton.click()
    await expect(page).toHaveURL('http://localhost:3000/contacts/add')
  })

  test('Add contacts', async ({ page }) => {
    await page.getByRole('link', { name: 'New' }).click()

    const addContactCard = page.getByTestId('add-contact')

    await expect(addContactCard).toBeVisible()
    await expect(
      addContactCard.locator('div').filter({
        has: page.getByRole('heading', { name: 'Add new contact' }),
      }),
    ).toHaveCount(1)
  })
})
