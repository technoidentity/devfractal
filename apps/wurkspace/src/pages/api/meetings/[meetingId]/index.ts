import { api } from '@srtp/next'
import { getMeeting, updateMeeting } from '@db/meetings'

export default api()
  .get(req => getMeeting({ eventId: req.query.meetingId }))
  .put(req => updateMeeting({ id: req.query.meetingId, meeting: req.body }))
