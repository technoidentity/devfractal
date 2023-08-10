import { api } from '@core/server'
import { getManagerProfile } from '@db/zohoProfile'
import { toStr } from '@srtp/spec'

export default api().get(async req => getManagerProfile(toStr(req.query.email)))
