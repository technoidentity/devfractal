import { epRoutes } from '@srtp/router'

import { ContactID, Search } from './specs'

const idPathSegment = { id: ContactID }

export const contactsPaths = epRoutes({
  one: { path: ['contacts', idPathSegment], search: Search },
  update: { path: ['contacts', idPathSegment, 'update'] },
  remove: { path: ['contacts', idPathSegment, 'deleted'] },
  add: { path: ['contacts', 'add'] },
})

export const rootPath = epRoutes({ list: { path: [''] } })

export const rootLink = rootPath.list.link({})
