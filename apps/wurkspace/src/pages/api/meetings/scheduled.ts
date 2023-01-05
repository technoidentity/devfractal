import { getScheduledMeetings } from '@db/meetings'
import { api } from '@srtp/next'

export default api().get(req =>
  getScheduledMeetings({ email: req.query.email }),
)
