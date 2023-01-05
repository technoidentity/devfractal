import { getCards } from '@db/meetings'
import { api } from '@srtp/next'

export default api().get(req => getCards({ id: req.query.meetingId }))
