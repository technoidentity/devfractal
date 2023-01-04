import { jstr } from '@core/casts'
import { api } from '@core/handler'
import { isTestMode } from '@core/isTestMode'
import { HTTPError } from '@core/response'
import { getGoogleEvents } from '@db/googleEvents'
import { getScheduledMeetings } from '@db/meetings'
import { getAuth } from '@ui/core/getAuth'

export default api().get(async req => {
  const session = await getAuth({ req })

  if (!session) {
    throw new HTTPError(401)
  }

  if (!isTestMode()) {
    // @TODO: fix Session type
    return getGoogleEvents({
      accessToken: (session as any).accessToken,
      email: session.user?.email,
    }).catch(err => {
      console.error(
        `Google events error: ${jstr(
          err,
        )}\nGetting events from the database instead`,
      )
      throw err
    })
  }

  return getScheduledMeetings({ email: session.user?.email })
})
