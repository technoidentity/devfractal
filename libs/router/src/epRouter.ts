import { isEmpty } from '@srtp/core'
import type {
  EndpointBase,
  GetEpResponse,
  Params,
  PathBase,
} from '@srtp/endpoint'
import { linkfn, paramsSpec, route } from '@srtp/endpoint'

import { cast } from '@srtp/spec'
import { createApi, toPath } from '@srtp/web'
import {
  type ActionFunction,
  type LoaderFunction,
  type RouteObject,
} from 'react-router-dom'
import { z } from 'zod'
import { safeActionData, safeLoaderData } from './hooks'

const api = createApi()

export function epPath<Path extends PathBase>(pathDef: Path) {
  const path = route(pathDef)
  const link = linkfn(pathDef)

  const useParams = (): Params<Path> => {
    const params = useParams()

    const result: any = pathDef ? cast(paramsSpec(pathDef), params) : params
    return result
  }

  return { path, link, useParams }
}

export function epLoader<Ep extends EndpointBase>(ep: Ep) {
  const useLoaderData = safeLoaderData(ep.response ?? z.unknown())

  const loader: LoaderFunction = args => {
    const params: any = ep.path
      ? cast(paramsSpec(ep.path), args.params)
      : args.params

    const path = toPath(route(ep.path), params)

    const query = Object.fromEntries(new URL(args.request.url).searchParams)
    const result = isEmpty(query) ? api.get(path) : api.get(path, query)

    return ep.response ? cast(ep.response, result) : result
  }

  return { useLoaderData, loader }
}

export function epAction<Ep extends EndpointBase>(ep: Ep) {
  const useActionData = safeActionData(ep.response ?? z.unknown())

  const action: ActionFunction = async args => {
    const params: any = ep.path
      ? cast(paramsSpec(ep.path), args.params)
      : args.params

    const path = toPath(route(ep.path), params)

    const result = api.post(
      path,
      Object.fromEntries(await args.request.formData()),
    )

    return ep.response ? cast(ep.response, result) : result
  }

  return { useActionData, action }
}

export type EpRouteObject<
  Path extends PathBase,
  LoaderEp extends EndpointBase,
  ActionEp extends EndpointBase,
> = RouteObject & {
  path: Path
  epLoader: LoaderEp
  epAction: ActionEp
}

type EpRouteResult<
  Path extends PathBase,
  LoaderEp extends EndpointBase,
  ActionEp extends EndpointBase,
> = {
  loader: LoaderFunction
  action: ActionFunction
  route: RouteObject
  useParams: () => Params<Path>
  link: (params?: Params<Path>) => string
  useLoaderData: () => GetEpResponse<LoaderEp>
  useActionData: () => GetEpResponse<ActionEp>
}

export function epRouteUtils<
  Path extends PathBase,
  LoaderEp extends EndpointBase,
  ActionEp extends EndpointBase,
>(
  args: EpRouteObject<Path, LoaderEp, ActionEp>,
): EpRouteResult<Path, LoaderEp, ActionEp> {
  const { path: pathDef, ...routeArgs } = args

  const { link, path, useParams } = epPath(pathDef)
  const routeObject: RouteObject = { path, ...routeArgs }

  const { useLoaderData, loader } = epLoader(args.epLoader)
  const { useActionData, action } = epAction(args.epAction)

  return {
    route: routeObject,
    useLoaderData,
    loader,
    useActionData,
    action,
    useParams,
    link,
  }
}
