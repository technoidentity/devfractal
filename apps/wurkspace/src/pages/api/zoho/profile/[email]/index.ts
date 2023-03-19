import { str } from '@srtp/spec'
import { api } from '@core/server'
import { getProfile } from '@db/zohoProfile'

export default api().get(async req => getProfile(str(req.query.email)))
