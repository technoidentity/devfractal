import { str } from '@srtp/core'
import { api } from '@srtp/next'
import { getManagerProfile } from '@db/zohoProfile'

export default api().get(async req => getManagerProfile(str(req.query.email)))
