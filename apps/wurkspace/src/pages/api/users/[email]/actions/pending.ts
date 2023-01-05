import { getPendingActions } from '@db/actions'
import { api } from '@srtp/next'

export default api().get(req => getPendingActions({ email: req.query.email }))
