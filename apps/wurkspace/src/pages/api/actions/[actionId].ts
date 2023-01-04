import { getAction, removeAction, updateAction } from '@db/actions'
import { api } from '@core/handler'

export default api()
  .get(req => getAction({ id: req.query.actionId }))
  .put(req => updateAction({ id: req.query.actionId, action: req.body }))
  .delete(req => removeAction({ id: req.query.actionId }))
