import { str } from '@srtp/core'
import { api } from '@srtp/next'
import { getProfile } from '@db/zohoProfile'

export default api().get(async req => getProfile(str(req.query.email)))
