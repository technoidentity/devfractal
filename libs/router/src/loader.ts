import type {
  EndpointBase,
  EndpointRecordBase,
  GetEpResponse,
} from '@srtp/core'
import { cast, isEmpty } from '@srtp/core'
import { keys, omap$ } from '@srtp/fn'
import {
  epAxios,
  fetch$,
  type BaseUrlOrFetch,
  fromSearchParams,
} from '@srtp/web'
import {
  useLoaderData as useRRLoaderData,
  type LoaderFunction,
} from 'react-router-dom'
import invariant from 'tiny-invariant'

import { safeLoaderData } from './safeHooks'
import { getSearch } from './utils'

export type EpLoaderResult<Ep extends EndpointBase> = {
  useLoaderData: () => GetEpResponse<Ep>
  loader: LoaderFunction
}

export function epLoader<Ep extends EndpointBase>(
  ep: Ep,
  baseUrlOrFetch: BaseUrlOrFetch = fetch$,
): EpLoaderResult<Ep> {
  invariant(ep.response !== undefined, 'epLoader: ep.response required')

  const loader: LoaderFunction = async args => {
    const search = fromSearchParams(getSearch(args.request))
    const request = isEmpty(search) ? undefined : search

    const [result] = await epAxios({
      ep,
      baseUrlOrFetch,
      params: args.params,
      request,
    })

    return result
  }

  return {
    loader,
    useLoaderData: safeLoaderData(ep.response),
  }
}

export type EpsLoaderResult<Eps extends EndpointRecordBase> = {
  useLoaderData: () => { [K in keyof Eps]: GetEpResponse<Eps[K]> }
  loader: LoaderFunction
}

export function epsLoader<const Eps extends EndpointRecordBase>(
  eps: Eps,
  baseUrlOrFetch: BaseUrlOrFetch = fetch$,
): EpsLoaderResult<Eps> {
  const loader: LoaderFunction = async args => {
    const requests: any[] = await Promise.all(
      Object.values(eps).map(async ep => {
        const search = fromSearchParams(getSearch(args.request))
        const request = isEmpty(search) ? undefined : search

        const [result] = await epAxios({
          ep,
          baseUrlOrFetch,
          params: args.params,
          request,
        })

        return result
      }),
    )

    return Object.fromEntries(keys(eps).map((key, i) => [key, requests[i]]))
  }

  const useLoaderData = () => {
    const data: any = useRRLoaderData()
    return omap$(eps, (ep, key) => cast(ep.response, data[key]))
  }

  return { loader, useLoaderData }
}
