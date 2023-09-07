import { orderedKeys, orderedEntries } from '@srtp/fn'
import invariant from 'tiny-invariant'
import { z } from 'zod'

import { cast, isObject } from '../spec'

import type { Params, PathBase } from './endpoint'

// return parameterized route like /users/:id/posts/:postId
export function route<Path extends PathBase>(path: Path): string {
  const segments = path.map(e =>
    isObject(e) ? `:${orderedKeys(e).join('/:')}` : `${e}`,
  )

  return `/${segments.join('/')}`
}

// return a function that takes params and returns a url
export function linkfn<const Paths extends PathBase>(
  path: Paths,
): (params?: Params<Paths>) => string {
  return params => {
    let url = route(path)
    for (const [k, v] of Object.entries(params ?? {})) {
      const value = v as string
      url = url.replace(`:${k}`, `${value}`)
    }
    invariant(!url.includes(':'), `url ${url} still contains :`)
    return url
  }
}

export function keysfn<const Path extends PathBase>(
  path: Path,
  params?: Params<Path> | undefined,
): string[] {
  const keys: string[] = []
  for (const segment of path) {
    const values = isObject(segment)
      ? orderedEntries(segment).map(([key, value]) =>
          cast(value, (params as any)[key]),
        )
      : [segment]

    keys.push(...values)
  }

  return keys
}

// Too much of a hack?
export function paramsSpec<Path extends PathBase>(
  path: Path,
): z.Schema<Params<Path>> {
  const rawSchema = {} as any

  for (const e of path) {
    if (isObject(e)) {
      Object.assign(rawSchema, e)
    }
  }

  return z.object(rawSchema) as any
}
