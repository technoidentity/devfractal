import { jstr } from '@core/casts'
import { api } from '@core/handler'
import { isTestMode } from '@core/isTestMode'
import { HTTPError } from '@core/response'
import { getGoogleEvent } from '@db/googleEvents'
import { getMeeting } from '@db/meetings'
import { getAuth } from '@ui/core/getAuth'

export default api().get(async req => {
  const session = await getAuth({ req })

  if (!session) {
    throw new HTTPError(401)
  }

  if (!isTestMode()) {
    return getGoogleEvent({
      accessToken: (session as any).accessToken,
      email: session.user?.email,
      id: req.query.eventId,
    }).catch(err => {
      console.error(`google event error: ${jstr(err)}`)
    })
  }

  return getMeeting({ eventId: req.query.eventId })
})
