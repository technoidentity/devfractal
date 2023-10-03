import { epRoutes } from '@srtp/router'

import { ContactID, Search } from './specs'

export const idPathSegment = { id: ContactID }

const paths = {
  one: { path: ['contacts', idPathSegment], search: Search },
  update: { path: ['contacts', idPathSegment, 'update'] },
  remove: { path: ['contacts', idPathSegment, 'deleted'] },
  add: { path: ['contacts', 'add'] },
} as const

export const contactsPaths = epRoutes(paths)

export const rootPath = epRoutes({ list: { path: [''] } })

export const rootLink = rootPath.list.link({})
