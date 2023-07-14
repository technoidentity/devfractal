import { cast } from '@srtp/spec'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { z } from 'zod'
import { date, boolean, int, string } from '@srtp/validator'

// @TODO: move to core?
const logAsyncError = (promise: Promise<any>) => {
  promise.catch(console.error)
}

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