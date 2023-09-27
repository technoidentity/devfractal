import { test, expect } from '@playwright/test'
import { baseUrl, getAnyContactLocator, mockContacts } from './utils'

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

    await searchBar.fill('test_string')
    await expect(searchBar).toHaveValue('test_string')

    await addNewButton.click()
    await expect(page).toHaveURL(`${baseUrl}/contacts/add`)
  })

  test('Add contacts', async ({ page }) => {
    await page.getByRole('link', { name: 'New' }).click()

    const addContactCard = page.getByTestId('add-contact')

    await expect(addContactCard).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Add new contact' }),
    ).toBeVisible()

    await page.getByRole('link', { name: 'Cancel' }).click()
    await expect(page).toHaveURL(baseUrl)

    await page.getByRole('link', { name: 'New' }).click()

    const nameField = page.getByPlaceholder('Name')
    const contactField = page.getByPlaceholder('Phone')
    const emailField = page.getByPlaceholder('Email')
    const jobField = page.getByPlaceholder('Website')

    await nameField.fill('test-name')
    await expect(nameField).toHaveValue('test-name')

    await contactField.fill('test-contact')
    await expect(contactField).toHaveValue('test-contact')

    await emailField.fill('test@email.com')
    await expect(emailField).toHaveValue('test@email.com')

    await jobField.fill('test-job')
    await expect(jobField).toHaveValue('test-job')

    await page.getByRole('button', { name: 'Save' }).click()
    await expect(page.getByRole('listitem')).toHaveCount(11)

    await expect(page).toHaveURL(baseUrl)
  })

  test('Navigate contacts', async ({ page }) => {
    const contactList = page.getByRole('listitem')
    const contactCount = await contactList.count()

    for (let i = 0; i < contactCount; i += 1) {
      const contact = contactList.nth(i).getByRole('link')

      await expect(contact).toHaveAttribute('href', `/contacts/${i + 1}`)
      await expect(contact).toBeEnabled()

      await contact.click()
      await expect(page).toHaveURL(`${baseUrl}/contacts/${i + 1}`)
    }
  })

  test('Display Contact', async ({ page }) => {
    const [contact, index] = getAnyContactLocator(page)

    await expect(contact).toBeEnabled()
    await contact.click()
    await expect(page).toHaveURL(`${baseUrl}/contacts/${index + 1}`)

    const contactDialog = page.getByRole('heading', {
      name: mockContacts[index],
    })
    await expect(contactDialog).toBeVisible()

    await expect(page.getByRole('link', { name: 'Edit' })).toBeEnabled()
    await expect(page.getByRole('button', { name: 'Delete' })).toBeEnabled()
  })

  test('Edit Contact', async ({ page }) => {
    const [contact, index] = getAnyContactLocator(page)

    await contact.click()
    await expect(page).toHaveURL(`${baseUrl}/contacts/${index + 1}`)

    await page.getByRole('link', { name: 'Edit' }).click()
    await expect(page).toHaveURL(`${baseUrl}/contacts/${index + 1}/update`)

    await expect(
      page.getByRole('heading', { name: 'Edit Contact' }),
    ).toBeVisible()

    await page.getByRole('button', { name: 'Save' }).click()
    await expect(page).toHaveURL(`${baseUrl}/contacts/${index + 1}`)
  })

  test('Delete Contact', async ({ page }) => {
    const [contact, index] = getAnyContactLocator(page)

    await contact.click()

    await page.getByRole('button', { name: 'Delete' }).click()
    await expect(page).toHaveURL(`${baseUrl}/contacts/${index + 1}/deleted`)

    await expect(page.getByText('Contact deleted!')).toBeVisible()
    await expect(page.getByRole('listitem')).toHaveCount(9)

    await expect(page.getByRole('link', { name: 'Home' })).toBeEnabled()
    await page.getByRole('link', { name: 'Home' }).click()

    await expect(page).toHaveURL(baseUrl)
  })
})
