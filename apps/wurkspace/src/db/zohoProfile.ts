import { post, sget } from '@core/api'
import { prisma } from '@core/prisma'
import type { Employee } from '@prisma/client'
import type { EmployeeResponse } from '@ui/responses'
import qs from 'query-string'
import invariant from 'tiny-invariant'
import { z } from 'zod'

const { stringify } = qs

const AccessTokenResponse = z.object({
  access_token: z.string(),
  api_domain: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
})
type AccessTokenResponse = z.infer<typeof AccessTokenResponse>

const refreshToken = process.env.ZOHO_REFRESH_TOKEN
const clientId = process.env.ZOHO_CLIENT_ID
const clientSecret = process.env.ZOHO_CLIENT_SECRET

invariant(refreshToken)
invariant(clientId)
invariant(clientSecret)

let zohoAccessToken: AccessTokenResponse | undefined

// @TODO: This is wrong, this should be in body
const query = stringify({
  refresh_token: refreshToken,
  client_id: clientId,
  client_secret: clientSecret,
  grant_type: 'refresh_token',
})

const tokenUrl = `https://accounts.zoho.com/oauth/v2/token?${query}`

const getAccessToken = async (
  { force } = { force: false },
): Promise<AccessTokenResponse> => {
  // @TODO: renew before expires_in?

  if (zohoAccessToken && !force) {
    return zohoAccessToken
  }

  zohoAccessToken = await post(tokenUrl, undefined)
  invariant(zohoAccessToken)
  return zohoAccessToken
}

const profileUrl = (email: string) =>
  `https://people.zoho.com/api/forms/employee/getRecords?searchColumn=EMPLOYEEMAILALIAS&searchValue=${email}`

const headers = (accessToken: string) => ({
  response: z.any(), // @TODO: spec for profiles?.response?.result?.[0]
  headers: {
    Accept: 'application/json',
    Authorization: `Zoho-oauthtoken ${accessToken}`,
  },
})

export const getProfileFromZoho = async (
  email: string,
  { force } = { force: false },
): // @TODO: type correctly
Promise<any> => {
  const { access_token } = await getAccessToken()
  const get = sget(headers(access_token))
  const baseURL = profileUrl(email)

  try {
    const profiles = await get(baseURL)
    // @TODO: add spec invariant
    const result = profiles?.response?.result?.[0]
    return result[Object.keys(result)[0]][0]
  } catch (err) {
    // @TODO: check correct error code from zoho, to refetch auth token
    console.log(err)
    if (!force) {
      return getProfileFromZoho(email, { force: true })
    } else {
      throw err
    }
  }
}

const getReportingToInfo = (reportingTo: string) => {
  const [firstName, lastName] = reportingTo.split(' ')
  return { firstName, lastName }
}

const converProfile = (zohoProfile: any): Employee => {
  const { firstName, lastName } = getReportingToInfo(zohoProfile.Reporting_To)

  return {
    email: zohoProfile.EmailID,
    firstName: zohoProfile.FirstName,
    lastName: zohoProfile.LastName,
    aboutMe: zohoProfile.AboutMe,
    mobile: zohoProfile.Mobile,
    photo: zohoProfile.Photo,
    userId: null,
    managerFirstName: firstName ?? null,
    managerLastName: lastName ?? null,
    managerEmail:
      zohoProfile.Reporting_To && zohoProfile['Reporting_To.MailID'],
  }
}

export const getProfileFromDb = async (email: string) => {
  const profile = await prisma.employee.findUnique({
    where: { email },
    include: { user: true },
  })

  return profile
}

export const getUserId = async (email: string): Promise<string | undefined> => {
  const userId = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  })

  return userId?.id
}

const updateUserId = async (profile: Employee) => {
  if (profile.userId) {
    return
  }

  const email = profile.email
  const userId = await getUserId(email)

  if (userId) {
    await prisma.employee.update({ where: { email }, data: { userId } })
    profile.userId = userId ?? null
  }
}

export const getProfile = async (email: string): Promise<EmployeeResponse> => {
  const profile = await getProfileFromDb(email)

  if (profile) {
    await updateUserId(profile)
    return profile
  }

  const zohoProfile = converProfile(await getProfileFromZoho(email))

  const userId = await getUserId(email)
  if (userId) {
    zohoProfile.userId = userId ?? null
  }

  await prisma.employee.upsert({
    where: { email: zohoProfile.email },
    create: zohoProfile,
    update: {},
  })

  return zohoProfile
}

export const getManagerProfile = async (
  email: string,
): Promise<EmployeeResponse> => {
  const employee = await prisma.employee.findUnique({
    where: { email },
  })
  invariant(employee?.managerEmail)

  return getProfile(employee?.managerEmail)
}
