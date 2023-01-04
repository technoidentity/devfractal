import { api } from '@core/handler'
import { createMeeting } from '@db/meetings'

export default api().post(req => createMeeting({ calendarEvent: req.body }))
