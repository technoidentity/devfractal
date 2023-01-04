import { api } from '@core/handler'
import { getDiscussions, postDiscussion } from '@db/discussions'

export default api()
  .get(req => getDiscussions({ meetingId: req.query.meetingId }))
  .post(req =>
    postDiscussion({ meetingId: req.query.meetingId, discussion: req.body }),
  )
