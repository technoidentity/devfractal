import { getMeetings } from '@db/meetings'
import { api } from '@core/server'

export default api().get(req => getMeetings({ email: req.query.email }))
