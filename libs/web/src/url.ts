import { isKey } from '@srtp/core'
import { debug, isArray, toStr, type Primitive } from '@srtp/core'
import invariant from 'tiny-invariant'

// type SearchObj = Record<string, Primitive | Primitive[]>
export type SearchObj = object

const dummyOrigin = 'https://dummy.url'

export function toSearchParams(obj: SearchObj): URLSearchParams {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(obj)) {
    if (isArray(value)) {
      for (const e of value) {
        params.append(key, toStr(e))
      }
    } else {
      params.append(key, toStr(value))
    }
  }

  return params
}

export function toSearch(obj: SearchObj): string {
  return toSearchParams(obj).toString()
}

export function fromSearchParams(urlSearchParams: URLSearchParams): object {
  const obj = {} as any

  for (const [key, value] of urlSearchParams.entries()) {
    if (isKey(obj, key)) {
      if (isArray(obj[key])) {
        obj[key].push(value)
      } else {
        obj[key] = [obj[key], value]
      }
    } else {
      obj[key] = value
    }
  }

  return obj
}

export function toPath(
  pathTemplate: string,
  params: Record<string, Primitive>,
): string {
  let path = pathTemplate

  for (const [key, value] of Object.entries(params)) {
    const placeholder = `:${key}`
    path = value ? path.replace(placeholder, toStr(value)) : path
  }

  invariant(!path.includes(':'), 'Missing params for path template')

  return new URL(path, dummyOrigin).pathname
}

export function toURL(origin: string, path: string, search?: SearchObj): URL {
  const qs = toSearch(search || {})
  const url = new URL(path, origin)
  url.search = qs

  return url
}

export function urlcat(base: string, path: string, search?: SearchObj): string {
  if (base.startsWith('http')) {
    const url = new URL(base)
    return toURL(url.origin, join(url.pathname, path), search).href
  }

  const url = toURL(dummyOrigin, join(base, path), search).href
  return url.slice(dummyOrigin.length)
}

function join(path1: string, path2: string): string {
  const p1 = path1.endsWith('/') ? path1.slice(0, -1) : path1
  const p2 = path2.startsWith('/') ? path2.slice(1) : path2

  debug(!p1.endsWith('/'), `${path1} ends with mutiple /`)
  debug(!p2.startsWith('/'), `${path1} starts with mutiple /`)

  const result = p1 === '' || p2 === '' ? p1 + p2 : `${p1}/${p2}`
  return result.endsWith('/') ? result.slice(0, -1) : result
}

export function joinPaths(paths: string[]) {
  if (paths.length === 0) {
    return '/'
  }

  let result = paths.reduce(join)

  if (!result.startsWith('/')) {
    result = `/${result}`
  }

  return result
}

export function searchToFormData(search: URLSearchParams): FormData {
  const formData = new FormData()

  for (const [key, value] of search.entries()) {
    formData.append(key, value)
  }

  return formData
}

export function formDataToSearch(formData: FormData): URLSearchParams {
  const search = new URLSearchParams()

  for (const [key, value] of formData.entries()) {
    search.append(key, value.toString())
  }

  return search
}
