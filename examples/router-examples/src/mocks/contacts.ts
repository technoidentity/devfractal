import { isDefined, isUndefined } from '@srtp/core'

export const contacts = [
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
  // {
  //   id: 6,
  //   name: 'Mrs. Dennis Schulist',
  //   username: 'Leopoldo_Corkery',
  //   email: 'Karley_Dach@jasper.info',
  //   address: {
  //     street: 'Norberto Crossing',
  //     suite: 'Apt. 950',
  //     city: 'South Christy',
  //     zipcode: '23505-1337',
  //     geo: {
  //       lat: '-71.4197',
  //       lng: '71.7478',
  //     },
  //   },
  //   phone: '1-477-935-8478 x6430',
  //   website: 'ola.org',
  //   company: {
  //     name: 'Considine-Lockman',
  //     catchPhrase: 'Synchronised bottom-line interface',
  //     bs: 'e-enable innovative applications',
  //   },
  // },
  // {
  //   id: 7,
  //   name: 'Kurtis Weissnat',
  //   username: 'Elwyn.Skiles',
  //   email: 'Telly.Hoeger@billy.biz',
  //   address: {
  //     street: 'Rex Trail',
  //     suite: 'Suite 280',
  //     city: 'Howemouth',
  //     zipcode: '58804-1099',
  //     geo: {
  //       lat: '24.8918',
  //       lng: '21.8984',
  //     },
  //   },
  //   phone: '210.067.6132',
  //   website: 'elvis.io',
  //   company: {
  //     name: 'Johns Group',
  //     catchPhrase: 'Configurable multimedia task-force',
  //     bs: 'generate enterprise e-tailers',
  //   },
  // },
  // {
  //   id: 8,
  //   name: 'Nicholas Runolfsdottir V',
  //   username: 'Maxime_Nienow',
  //   email: 'Sherwood@rosamond.me',
  //   address: {
  //     street: 'Ellsworth Summit',
  //     suite: 'Suite 729',
  //     city: 'Aliyaview',
  //     zipcode: '45169',
  //     geo: {
  //       lat: '-14.3990',
  //       lng: '-120.7677',
  //     },
  //   },
  //   phone: '586.493.6943 x140',
  //   website: 'jacynthe.com',
  //   company: {
  //     name: 'Abernathy Group',
  //     catchPhrase: 'Implemented secondary concept',
  //     bs: 'e-enable extensible e-tailers',
  //   },
  // },
  // {
  //   id: 9,
  //   name: 'Glenna Reichert',
  //   username: 'Delphine',
  //   email: 'Chaim_McDermott@dana.io',
  //   address: {
  //     street: 'Dayna Park',
  //     suite: 'Suite 449',
  //     city: 'Bartholomebury',
  //     zipcode: '76495-3109',
  //     geo: {
  //       lat: '24.6463',
  //       lng: '-168.8889',
  //     },
  //   },
  //   phone: '(775)976-6794 x41206',
  //   website: 'conrad.com',
  //   company: {
  //     name: 'Yost and Sons',
  //     catchPhrase: 'Switchable contextually-based project',
  //     bs: 'aggregate real-time technologies',
  //   },
  // },
  // {
  //   id: 10,
  //   name: 'Clementina DuBuque',
  //   username: 'Moriah.Stanton',
  //   email: 'Rey.Padberg@karina.biz',
  //   address: {
  //     street: 'Kattie Turnpike',
  //     suite: 'Suite 198',
  //     city: 'Lebsackbury',
  //     zipcode: '31428-2261',
  //     geo: {
  //       lat: '-38.2386',
  //       lng: '57.2232',
  //     },
  //   },
  //   phone: '024-648-3804',
  //   website: 'ambrose.net',
  //   company: {
  //     name: 'Hoeger LLC',
  //     catchPhrase: 'Centralized empowering task-force',
  //     bs: 'target end-to-end models',
  //   },
  // },
]

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
  const newContact = { id: idIndex++, name, email, phone, website }
  contacts.push(newContact)
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
