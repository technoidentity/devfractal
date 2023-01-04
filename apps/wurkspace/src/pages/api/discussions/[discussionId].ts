import {
  getDiscussion,
  removeDiscussion,
  updateDiscussion,
} from '@db/discussions'
import { api } from '@core/handler'

export default api()
  .get(req => getDiscussion({ id: req.query.discussionId }))
  .put(req =>
    updateDiscussion({ id: req.query.discussionId, discussion: req.body }),
  )
  .delete(req => removeDiscussion({ id: req.query.discussionId }))
