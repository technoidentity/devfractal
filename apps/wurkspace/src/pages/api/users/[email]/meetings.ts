import { getMeetings } from '@db/meetings'
import { api } from '@core/handler'

export default api().get(req => getMeetings({ email: req.query.email }))
