import { str } from '@core/casts'
import { api } from '@core/handler'
import { getProfile } from '@db/zohoProfile'

export default api().get(async req => getProfile(str(req.query.email)))
