import type { EndpointBase, GetEpResponse } from '@srtp/core'
import { epAxios, fetch$, type BaseUrlOrFetch } from '@srtp/web'
import { type ActionFunction } from 'react-router-dom'
import { z } from 'zod'

import { safeActionData } from './safeHooks'
import { formData } from './utils'

export type EpActionResult<Ep extends EndpointBase> = {
  useActionData: () => GetEpResponse<Ep>
  action: ActionFunction
}

export function epAction<const Ep extends EndpointBase>(
  ep: Ep,
  baseUrlOrFetch: BaseUrlOrFetch = fetch$,
): EpActionResult<Ep> {
  const useActionData = safeActionData(ep.response ?? z.undefined())

  const action: ActionFunction = async args =>
    // both request and params will be validated by axios
    epAxios({
      ep,
      baseUrlOrFetch,
      request: await formData(args.request),
      params: args.params,
    })

  return { useActionData, action }
}

// @TODO: epActions, taking multiple endpoints and returning a single action
