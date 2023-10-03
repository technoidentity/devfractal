/* eslint-disable @typescript-eslint/naming-convention */
import type {
  If,
  IsDefined,
  IsNonEmptyObject,
  Params,
  PathBase,
} from '@srtp/core'
import { cast, linkfn, paramsSpec, route } from '@srtp/core'
import { omap$ } from '@srtp/fn'
import {
  Link as ReactRouterLink,
  NavLink as ReactRouterNavLink,
  type LinkProps,
  type LoaderFunctionArgs,
  type NavLinkProps,
  type RouteObject,
} from 'react-router-dom'
import type { z } from 'zod'

import {
  safeNavigate,
  safeParams,
  safeSearch,
  type UseSearchResult,
} from './safeHooks'
import { castSearch } from './utils'

type NavigateResult<Path extends PathBase> = If<
  IsNonEmptyObject<Params<Path>>,
  () => (values: Params<Path>) => void,
  () => () => void
>

type ParamsFn<Path extends PathBase> = If<
  IsNonEmptyObject<Params<Path>>,
  { params: Params<Path> },
  { params?: undefined }
>

type RouterPathLinkProps<Path extends PathBase> = Omit<LinkProps, 'to'> &
  ParamsFn<Path>

type RouterPathNavLinkProps<Path extends PathBase> = Omit<NavLinkProps, 'to'> &
  ParamsFn<Path>

type ParamsFns<Path extends PathBase> = If<
  IsNonEmptyObject<Params<Path>>,
  {
    params: (args: LoaderFunctionArgs) => Params<Path>
    useParams: () => Params<Path>
  },
  object
>
export type RouterPathResult<Path extends PathBase> = {
  path: string
  useNavigate: NavigateResult<Path>
  link: (params: Params<Path>) => string
  Link: (props: RouterPathLinkProps<Path>) => JSX.Element
  NavLink: (props: RouterPathNavLinkProps<Path>) => JSX.Element
} & ParamsFns<Path>

export function routerPath<const Path extends PathBase>(
  pathDef: Path,
): RouterPathResult<Path> {
  const spec = paramsSpec(pathDef)

  // TODO: what if no spec?

  const Link = ({ params, ...props }: RouterPathLinkProps<Path>) => {
    const to = linkfn(pathDef)(params)

    return <ReactRouterLink to={to} {...props} />
  }

  const NavLink = ({ params, ...props }: RouterPathLinkProps<Path>) => {
    const to = linkfn(pathDef)(params)

    return <ReactRouterNavLink to={to} {...props} />
  }

  const params = (args: LoaderFunctionArgs) => cast(spec, args.params)

  const result = {
    path: route(pathDef),
    link: linkfn(pathDef),
    Link,
    NavLink,
    params,
    useParams: safeParams(spec),
    useNavigate: safeNavigate(pathDef),
  }

  return result as any
}

export type SearchFns<Search extends z.ZodTypeAny | undefined> = If<
  IsDefined<Search>,
  {
    search: (args: LoaderFunctionArgs) => z.infer<NonNullable<Search>>
    useSearch: () => UseSearchResult<NonNullable<Search>>
  },
  object
>

export type SearchPathResult<
  Path extends PathBase,
  Search extends z.ZodTypeAny | undefined,
> = RouterPathResult<Path> & SearchFns<Search>

export function searchPath<
  const Path extends PathBase,
  Search extends z.ZodTypeAny | undefined,
>(pathDef: Path, search?: Search): SearchPathResult<Path, Search> {
  const searchResult: any = search
    ? {
        useSearch: safeSearch(search),
        search: (args: LoaderFunctionArgs) => castSearch(search, args.request),
      }
    : {}

  return { ...routerPath(pathDef), ...searchResult }
}

export type RouterPathRecordBase = Record<string, PathBase>

export type RouterPathsResult<Paths extends RouterPathRecordBase> = Readonly<{
  [K in keyof Paths]: RouterPathResult<Paths[K]>
}>

export function routerPaths<const Paths extends RouterPathRecordBase>(
  ps: Paths,
): RouterPathsResult<Paths> {
  return omap$(ps, v => routerPath(v))
}

type SearchPathBase<
  Path extends PathBase,
  Search extends z.ZodTypeAny | undefined,
> = Readonly<{
  path: Path
  search?: Search
}>

export type SearchPathRecordBase = Record<string, SearchPathBase<any, any>>

export type SearchPathsResult<Sps extends SearchPathRecordBase> = {
  [K in keyof Sps]: RouterPathResult<Sps[K]['path']> &
    SearchFns<Sps[K]['search']>
}

export function searchPaths<const Sps extends SearchPathRecordBase>(
  sps: Sps,
): SearchPathsResult<Sps> {
  return omap$(sps, v => searchPath(v.path, v.search)) as any
}

type RouteObjects<Sps extends SearchPathRecordBase> = {
  [K in keyof Sps]: Omit<RouteObject, 'path'>
}

export function searchRoute<const Sp extends SearchPathBase<any, any>>(
  args: SearchPathResult<Sp['path'], Sp['search']>,
  route: RouteObject,
): RouteObject {
  return { ...route, path: args.path } as RouteObject
}

export function searchRoutes<const Sps extends SearchPathRecordBase>(
  args: SearchPathsResult<Sps>,
  routes: RouteObjects<Sps>,
): RouteObject[] {
  const result: RouteObject[] = []

  for (const [key, value] of Object.entries(args)) {
    const { path } = value
    result.push({ ...routes[key], path } as RouteObject)
  }

  return result
}
