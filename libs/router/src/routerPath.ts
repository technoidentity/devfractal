import { linkfn, paramsSpec, route } from '@srtp/core'
import type { Params, PathBase } from '@srtp/core'
import type { IfFnArg, Iff, IsNonEmpty } from '@srtp/core'

import { safeNavigate, safeParams } from './hooks'

export type NavigateResult<Path extends PathBase> = IfFnArg<
  IsNonEmpty<Params<Path>>,
  Params<Path>,
  void
>

export type EpPathResult<Path extends PathBase> = {
  path: string
  useNavigate: () => NavigateResult<Path>
} & Iff<
  IsNonEmpty<Params<Path>>,
  {
    link: (params: Params<Path>) => string
    useParams: () => Params<Path>
  }
>

export function routerPath<Path extends PathBase>(
  pathDef: Path,
): EpPathResult<Path> {
  const spec = paramsSpec(pathDef)

  return {
    path: route(pathDef),
    // @TODO: use search too? Keep it optional?
    link: linkfn(pathDef),
    useParams: safeParams(spec) as () => Params<Path>,
    useNavigate: safeNavigate(pathDef) as () => NavigateResult<Path>,
  }
}
