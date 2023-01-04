import { str } from '@core/casts'
import { api } from '@core/handler'
import { getManagerProfile } from '@db/zohoProfile'

export default api().get(async req => getManagerProfile(str(req.query.email)))
