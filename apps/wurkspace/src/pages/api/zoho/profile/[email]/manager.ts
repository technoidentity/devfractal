import { api } from '@core/server'
import { getManagerProfile } from '@db/zohoProfile'
import { str } from '@srtp/core'

export default api().get(async req => getManagerProfile(str(req.query.email)))
