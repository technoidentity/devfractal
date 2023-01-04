import { forwardDiscussions } from '@db/discussions'
import { api } from '@core/handler'

export default api().put(req =>
  forwardDiscussions({
    id: req.query.meetingId,
    discussionIds: req.body.discussionIds,
  }),
)
