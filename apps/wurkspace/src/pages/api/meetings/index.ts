import { api } from '@core/server'
import { createMeeting } from '@db/meetings'

export default api().post(req => createMeeting({ calendarEvent: req.body }))
