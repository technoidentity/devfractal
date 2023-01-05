import { api } from '@srtp/next'
import { createMeeting } from '@db/meetings'

export default api().post(req => createMeeting({ calendarEvent: req.body }))
