import { isDefined, isUndefined } from '@srtp/core'

const mockContacts = [
  {
    id: 1,
    name: 'Leanne Graham',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    email: 'Shanna@melissa.tv',
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    email: 'Nathan@yesenia.net',
    phone: '1-463-123-4447',
    website: 'ramiro.info',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    email: 'Julianne.OConner@kory.org',
    phone: '493-170-9623 x156',
    website: 'kale.biz',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    email: 'Lucio_Hettinger@annie.ca',
    phone: '(254)954-1289',
    website: 'demarco.info',
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    email: 'Karley_Dach@jasper.info',
    phone: '1-477-935-8478 x6430',
    website: 'ola.org',
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    email: 'Telly.Hoeger@billy.biz',
    phone: '210.067.6132',
    website: 'elvis.io',
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    email: 'Sherwood@rosamond.me',
    phone: '586.493.6943 x140',
    website: 'jacynthe.com',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    email: 'Chaim_McDermott@dana.io',
    phone: '(775)976-6794 x41206',
    website: 'conrad.com',
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    email: 'Rey.Padberg@karina.biz',
    phone: '024-648-3804',
    website: 'ambrose.net',
  },
]

const contacts: typeof mockContacts = []
// For id
let idIndex = 11

export const getContacts = () => {
  return contacts
}

export const getContactById = (id: number) => {
  return contacts.find(contact => contact.id === id)
}

export const editContactDetails = (
  id: number,
  update: Omit<(typeof contacts)[number], 'id'>,
) => {
  const contact = getContactById(id)

  if (isUndefined(contact)) {
    return
  }

  if (isDefined(update.name)) {
    contact.name = update.name
  }

  if (isDefined(update.phone)) {
    contact.phone = update.phone
  }

  if (isDefined(update.email)) {
    contact.email = update.email
  }

  if (isDefined(update.website)) {
    contact.website = update.website
  }

  return contact
}

export const addContact = ({
  name,
  email,
  phone,
  website,
}: Omit<(typeof contacts)[number], 'id'>) => {
  const newContact = { id: idIndex, name, email, phone, website }
  contacts.push(newContact)
  idIndex += 1
  return newContact
}

export const deleteContact = (id: number) => {
  const contactIndex = contacts.findIndex(contact => contact.id === id)

  if (contactIndex !== -1) {
    const deleted = contacts[contactIndex]
    contacts.splice(contactIndex, 1)
    return deleted
  }

  return undefined
}

const initializeContacts = () => {
  contacts.push(...mockContacts)
}

initializeContacts()
