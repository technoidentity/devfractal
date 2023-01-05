import { getCompletedMeetings } from '@db/meetings'
import { api } from '@srtp/next'

export default api().get(req =>
  getCompletedMeetings({ email: req.query.email }),
)
