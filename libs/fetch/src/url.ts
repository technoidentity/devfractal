import { isKey } from '@srtp/core'
import type { Primitive } from '@srtp/spec'
import invariant from 'tiny-invariant'

type SearchObj = Record<string, Primitive | Primitive[]>
const dummyURL = 'https://localhost'

export function toSearchParams(obj: SearchObj) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      for (const e of value) {
        params.append(key, e.toString())
      }
    } else {
      params.append(key, value.toString())
    }
  }

  return params
}

export function toSearch(obj: SearchObj) {
  const params = toSearchParams(obj)
  return params.toString()
}

export function fromSearch(urlSearchParams: URLSearchParams) {
  const obj = {} as any

  for (const [key, value] of urlSearchParams.entries()) {
    if (isKey(obj, key)) {
      if (Array.isArray(obj[key])) {
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

export function substPath(
  pathTemplate: string,
  params: Record<string, Primitive>,
): string {
  let path = pathTemplate

  for (const [key, value] of Object.entries(params)) {
    const placeholder = `:${key}`
    path = path.replace(placeholder, value.toString())
  }

  invariant(!path.includes(':'), 'Missing params for path template')

  return path
}

export function toPath(
  pathTemplate: string,
  params: Record<string, Primitive>,
): string {
  const path = substPath(pathTemplate, params)
  return new URL(path, dummyURL).pathname
}

toPath('/users/:id', { id: 1 })

export function toURL(baseUrl: string, path: string, search?: SearchObj): URL {
  const qs = toSearch(search || {})
  const url = new URL(path, baseUrl)
  url.search = qs

  return url
}

export function urlcat(
  baseUrl: string,
  path: string,
  search?: SearchObj,
): string {
  return toURL(baseUrl, path, search).toString()
}

function join(path1: string, path2: string): string {
  const p1 = path1.endsWith('/') ? path1.slice(0, -'/'.length) : path1
  const p2 = path2.startsWith('/') ? path2.slice('/'.length) : path2
  return p1 === '' || p2 === '' ? p1 + p2 : `${p1}/${p2}`
}

export function joinPaths(...paths: string[]) {
  return paths.reduce((acc, cur) => join(acc, cur))
}
