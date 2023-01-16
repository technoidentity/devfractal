import { getCards } from '@db/meetings'
import { api } from '@core/server'

export default api().get(req => getCards({ id: req.query.meetingId }))
