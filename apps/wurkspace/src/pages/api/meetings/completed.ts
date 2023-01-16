import { getCompletedMeetings } from '@db/meetings'
import { api } from '@core/server'

export default api().get(req =>
  getCompletedMeetings({ email: req.query.email }),
)
