import { test, expect } from '@playwright/test'

const baseUrl = 'http://localhost:3000'

test.describe('contacts router example', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl)
    expect(page.locator('#root')).not.toBeNull()
  })

  test('Root Layout', async ({ page }) => {
    await expect(page).toHaveURL(baseUrl)

    const addNewButton = page.getByRole('link', { name: 'New' })
    const searchBar = page.getByRole('searchbox')

    await expect(page.getByRole('listitem')).toHaveCount(10)
    await expect(searchBar).toBeEnabled()
    await expect(addNewButton).toHaveAttribute('href', '/contacts/add')
    await expect(addNewButton).toBeEnabled()

    await searchBar.type('test string')
    await expect(searchBar).toHaveValue('test string')

    await addNewButton.click()
    await expect(page).toHaveURL(`${baseUrl}/contacts/add`)
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

    await page.getByRole('link', { name: 'Cancel' }).click()
    await expect(page).toHaveURL(baseUrl)

    await page.getByRole('link', { name: 'New' }).click()

    const nameField = page.getByPlaceholder('Name')
    const contactField = page.getByPlaceholder('Contact')
    const emailField = page.getByPlaceholder('Email')
    const jobField = page.getByPlaceholder('Job')

    await nameField.type('test-name')
    await expect(nameField).toHaveValue('test-name')

    await contactField.type('test-contact')
    await expect(contactField).toHaveValue('test-contact')

    await emailField.type('test@email.com')
    await expect(emailField).toHaveValue('test@email.com')

    await jobField.type('test-job')
    await expect(jobField).toHaveValue('test-job')

    await page.getByRole('link', { name: 'Save' }).click()
    await expect(page).toHaveURL(baseUrl)
  })

  test('Contacts', async ({ page }) => {
    const contactList = page.getByRole('listitem')
    const randomIndex = Math.floor(Math.random() * 10)
    const contact = contactList.nth(randomIndex).getByRole('link')

    await expect(contactList).toHaveCount(10)
    await expect(contact).toHaveAttribute(
      'href',
      `/contacts/${randomIndex + 1}`,
    )
    await expect(contact).toBeEnabled()

    await contact.click()
    await expect(page).toHaveURL(`${baseUrl}/contacts/${randomIndex + 1}`)
  })

  test('Display Contact', async ({ page }) => {
    const contact = await page.getByRole('listitem').filter({
      has: page.getByRole('link').filter({ hasText: 'Ervin Howell' }),
    })

    await expect(contact).toBeEnabled()
    await contact.click()
    await expect(page).toHaveURL(`${baseUrl}/contacts/2`)

    const contactDialog = page.getByRole('heading', { name: 'Ervin Howell' })
    await expect(contactDialog).toBeVisible()

    await expect(page.getByRole('link', { name: 'Edit' })).toBeEnabled()
    await expect(page.getByRole('link', { name: 'Delete' })).toBeEnabled()
  })

  test('Edit Contact', async ({ page }) => {
    await page.getByRole('link', { name: 'Ervin Howell' }).click()
    await expect(page).toHaveURL(`${baseUrl}/contacts/2`)

    await page.getByRole('link', { name: 'Edit' }).click()
    await expect(page).toHaveURL(`${baseUrl}/contacts/2/edit`)

    await expect(
      page.getByRole('heading', { name: 'Edit Contact' }),
    ).toBeVisible()

    await page.getByRole('button', { name: 'Save' }).click()
    await expect(page).toHaveURL(baseUrl)
  })

  test('Delete Contact', async ({ page }) => {
    await page.getByRole('link', { name: 'Ervin Howell' }).click()

    await page.getByRole('link', { name: 'Delete' }).click()
    await expect(page).toHaveURL(`${baseUrl}/contacts/2/destroy`)

    await expect(page.getByText('Contact deleted!')).toBeVisible()

    await expect(page.getByRole('link', { name: 'Home' })).toBeEnabled()
    await page.getByRole('link', { name: 'Home' }).click()
    await expect(page).toHaveURL(baseUrl)
  })
})
