import { getPendingActions } from '@db/actions'
import { api } from '@core/server'

export default api().get(req => getPendingActions({ email: req.query.email }))
