import { getScheduledMeetings } from '@db/meetings'
import { api } from '@core/server'

export default api().get(req =>
  getScheduledMeetings({ email: req.query.email }),
)
