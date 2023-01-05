import { api } from '@srtp/next'
import { getSessionByUser } from '@db/users'

export default api().get(req => getSessionByUser({ email: req.query.email }))
