import { cast, isObject } from '@srtp/spec'
import invariant from 'tiny-invariant'
import type { Params, PathBase } from './endpoint'

const orderedEntries = <T extends object>(obj: T) =>
  Object.entries(obj).sort(([a], [b]) => a.localeCompare(b))

const orderedKeys = <T extends object>(obj: T) =>
  orderedEntries(obj).map(([k]) => k)

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
    for (const [k, v] of Object.entries(params || {})) {
      const value = v as string
      url = url.replace(`:${k}`, `${value}`)
    }
    invariant(!url.includes(':'), `url ${url} still contains :`)
    return url
  }
}

export const keysfn = <const Path extends PathBase>(
  path: Path,
  params: Params<Path>,
) => {
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
