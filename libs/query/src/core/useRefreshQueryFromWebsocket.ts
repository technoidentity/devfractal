import { cast } from '@srtp/core'
import { date, boolean, int, string } from '@srtp/core'
import { logAsyncError } from '@srtp/core'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { z } from 'zod'

const Stringly = z.union([string(), int(), boolean(), date()])

const InvalidateQuerySpec = z.array(Stringly)
type InvalidateQuerySpec = z.infer<typeof InvalidateQuerySpec>

// @TODO: This must be wrapping useSafeQuery. Until then let this be a reminder.
export function useRefreshQueryFromWebsocket(
  messageSpec: typeof InvalidateQuerySpec,
  wsUrl: string,
) {
  const queryClient = useQueryClient()

  React.useEffect(() => {
    const websocket = new WebSocket(wsUrl)
    websocket.onopen = () => {
      // eslint-disable-next-line no-console
      console.log('connected')
    }

    websocket.onmessage = event => {
      const queryKey = cast(messageSpec, JSON.parse(event.data))
      logAsyncError(queryClient.invalidateQueries({ queryKey }))
    }

    return () => {
      websocket.close()
    }
  }, [messageSpec, queryClient, wsUrl])
}
