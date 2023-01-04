import { getCompletedMeetings } from '@db/meetings'
import { api } from '@core/handler'

export default api().get(req =>
  getCompletedMeetings({ email: req.query.email }),
)
