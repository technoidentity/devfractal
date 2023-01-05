import { getMeetings } from '@db/meetings'
import { api } from '@srtp/next'

export default api().get(req => getMeetings({ email: req.query.email }))
