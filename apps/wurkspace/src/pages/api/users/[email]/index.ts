import { api } from '@core/handler'
import { getSessionByUser } from '@db/users'

export default api().get(req => getSessionByUser({ email: req.query.email }))
