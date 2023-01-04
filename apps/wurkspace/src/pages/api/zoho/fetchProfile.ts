// @TODO: no handler?

import axios from 'redaxios'

interface RequestParams {
  sIndex?: number
  limit?: number
  searchColumn?: 'EMPLOYEEMAILALIAS' | 'EMPLOYEEID'
  searchValue?: string | undefined | null
}

// for accessing profile information from zoho api
export const fetchProfile = async (options?: RequestParams) => {
  let baseURL = 'https://people.zoho.com/api/forms/employee/getRecords?'

  if (options) {
    if (options.sIndex) {
      baseURL += `sIndex=${options.sIndex}&`
    }
    if (options.limit) {
      baseURL += `limit=${options.limit}&`
    }
    if (options.searchColumn) {
      baseURL += `searchColumn=${options.searchColumn}&`
    }
    if (options.searchValue) {
      baseURL += `searchValue=${options.searchValue}&`
    }
  }

  const profile = await axios
    .get(baseURL, {
      headers: {
        Authorization: `Zoho-oauthtoken ${await RefreshAccessToken()}`,
      },
    })
    .then(result => {
      return result.data
    })

  return profile
}

interface AccessTokenResponse {
  access_token: string
  api_domain: string
  token_type: string
  expires_in: number
}
// Refresh the access_token
export const RefreshAccessToken = async () => {
  const accessTokenResponse: AccessTokenResponse = await axios
    .post(
      `https://accounts.zoho.com/oauth/v2/token?refresh_token=${process.env.ZOHO_REFRESH_TOKEN}&client_id=${process.env.ZOHO_CLIENT_ID}&client_secret=${process.env.ZOHO_CLIENT_SECRET}&grant_type=refresh_token`,
    )
    .then(result => {
      return result.data
    })

  return accessTokenResponse?.access_token
}
