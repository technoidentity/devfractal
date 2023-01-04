import { getCards } from '@db/meetings'
import { api } from '@core/handler'

export default api().get(req => getCards({ id: req.query.meetingId }))
