import { forwardDiscussions } from '@db/discussions'
import { api } from '@srtp/next'

export default api().put(req =>
  forwardDiscussions({
    id: req.query.meetingId,
    discussionIds: req.body.discussionIds,
  }),
)
