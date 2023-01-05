import { getActions, postAction } from '@db/actions'
import { api } from '@srtp/next'

export default api()
  .get(req => getActions({ meetingId: req.query.meetingId }))
  .post(req => postAction({ meetingId: req.query.meetingId, action: req.body }))
