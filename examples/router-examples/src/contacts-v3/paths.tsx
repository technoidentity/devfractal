import { pick$ } from '@srtp/fn'
import { epRoutes } from '@srtp/router'

import { endpoints } from './api'
import { ContactID, Search } from './specs'

export const idPathSegment = { id: ContactID }

export const contactPaths = epRoutes({
  contact: {
    path: ['contacts', idPathSegment],
    search: Search,
    loader: pick$(endpoints, ['contact']),
    action: { endpoint: endpoints.remove },
  },

  update: {
    path: ['contacts', idPathSegment, 'update'],
    loader: pick$(endpoints, ['contact']),
    action: { endpoint: endpoints.update },
  },

  remove: {
    path: ['contacts', idPathSegment, 'deleted'],
  },

  add: {
    path: ['contacts', 'add'],
    action: { endpoint: endpoints.add },
  },
})

export const rootPath = epRoutes({
  contacts: {
    path: [''],
    loader: pick$(endpoints, ['contacts']),
    action: { endpoint: endpoints.remove },
  },
})

export const rootLink = rootPath.contacts.link({})
