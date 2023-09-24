import type { Locator, Page } from '@playwright/test'
import { getContacts } from '@/mocks/contacts'

export const baseUrl = 'http://localhost:3000'

export const mockContacts = getContacts().map(contact => contact.name)

export const getAnyContactLocator = (
  page: Page,
): readonly [Locator, number] => {
  const contactList = page.getByRole('listitem')
  const randomIndex = Math.floor(Math.random() * 10)

  const contact = contactList.nth(randomIndex).getByRole('link')

  return [contact, randomIndex] as const
}
