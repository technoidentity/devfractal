import { pick$ } from '@srtp/fn'
import { epRouter } from '@srtp/router'

import { endpoints } from './api'
import { ContactID, Search } from './specs'

export const idPathSegment = { id: ContactID }

export const contactPaths = epRouter({
  list: {
    path: ['contacts', idPathSegment],
    search: Search,
    loader: pick$(endpoints, ['list', 'one']),
  },
  update: { path: ['contacts', idPathSegment, 'update'] },
  remove: { path: ['contacts', idPathSegment, 'deleted'] },
  add: { path: ['contacts', 'add'] },
})

export const rootPath = epRouter({
  root: { path: [''] },
})

export const rootLink = rootPath.root.link({})
