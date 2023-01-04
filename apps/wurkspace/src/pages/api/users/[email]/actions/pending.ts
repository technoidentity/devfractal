import { getPendingActions } from '@db/actions'
import { api } from '@core/handler'

export default api().get(req => getPendingActions({ email: req.query.email }))
