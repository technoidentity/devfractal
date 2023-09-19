import type {
  Iff,
  IfFnArg,
  IsNonEmptyObject,
  Params,
  PathBase,
} from '@srtp/core'
import { linkfn, paramsSpec, route } from '@srtp/core'

import type { z } from 'zod'
import {
  safeNavigate,
  safeParams,
  safeSearch,
  type UseSearchResult,
} from './hooks'

export type NavigateResult<Path extends PathBase> = IfFnArg<
  IsNonEmptyObject<Params<Path>>,
  (values: Params<Path>) => void,
  undefined
>

export type EpPathResult<Path extends PathBase> = {
  path: string
  useNavigate: NavigateResult<Path>
} & Iff<
  IsNonEmptyObject<Params<Path>>,
  {
    link: (params: Params<Path>) => string
    useParams: () => Params<Path>
  }
>

export function routerPath<Path extends PathBase>(
  pathDef: Path,
): EpPathResult<Path> {
  const spec = paramsSpec(pathDef)

  const result = {
    path: route(pathDef),
    link: linkfn(pathDef),
    useParams: safeParams(spec),
    useNavigate: safeNavigate(pathDef),
  }

  return result as any
}

export function searchPath<Path extends PathBase, Search extends z.ZodTypeAny>(
  pathDef: Path,
  search: Search,
): EpPathResult<Path> & { useSearch: () => UseSearchResult<Search> } {
  return { ...routerPath(pathDef), useSearch: safeSearch(search) }
}
