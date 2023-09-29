import type {
  EndpointBase,
  EndpointRecordBase,
  GetEpResponse,
} from '@srtp/core'
import { cast } from '@srtp/core'
import { keys, omap$ } from '@srtp/fn'
import { epAxios, fetch$, type BaseUrlOrFetch } from '@srtp/web'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'
import invariant from 'tiny-invariant'

import { safeLoaderData } from './safeHooks'
import { formData } from './utils'

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
    return (
      await epAxios({
        ep,
        baseUrlOrFetch,
        params: args.params,
        request: formData(args.request),
      })
    )[0]
  }

  return {
    loader,
    useLoaderData: safeLoaderData(ep.response),
  }
}

export type EpsLoaderResult<Eps extends EndpointRecordBase> = {
  useLoader: () => { [K in keyof Eps]: GetEpResponse<Eps[K]> }
  loader: LoaderFunction
}

export function epsLoader<const Eps extends EndpointRecordBase>(
  eps: Eps,
  baseUrlOrFetch: BaseUrlOrFetch = fetch$,
): EpsLoaderResult<Eps> {
  const loader: LoaderFunction = async args => {
    const requests: any[] = await Promise.all(
      Object.values(eps).map(
        async ep =>
          (
            await epAxios({
              ep,
              baseUrlOrFetch,
              params: args.params,
              request: formData(args.request),
            })
          )[0],
      ),
    )

    return Object.fromEntries(keys(eps).map((key, i) => [key, requests[i]]))
  }

  const useLoader = () => {
    const data: any = useLoaderData()
    return omap$(eps, (ep, key) => cast(ep.response, data[key]))
  }

  return { loader, useLoader }
}
