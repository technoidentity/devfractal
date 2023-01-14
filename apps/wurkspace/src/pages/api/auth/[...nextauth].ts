import { prisma } from '@core/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const scopes = [
  'email',
  'profile',
  'https://www.googleapis.com/auth/calendar.events.readonly',
  'https://www.googleapis.com/auth/calendar.readonly',
]
const GOOGLE_AUTHORIZATION_URL = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(
  {
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code',
    scope: scopes.join(' '),
  },
).toString()}`

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    // OAuth authentication providers
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: GOOGLE_AUTHORIZATION_URL,
    }),
  ],
  jwt: { secret: process.env.SECRET },
  pages: {
    signIn: '/Login',
    error: '/Login',
  },
  secret: process.env.SECRET,
  callbacks: {
    async signIn() {
      // @TODO: Use the below code after done with prototyping
      // signIn({ account, profile }) {
      // if (account.provider === 'google') {
      //   return (
      //     !!profile.email_verified &&
      //     !!profile.email?.endsWith('@technoidentity.com')
      //   )
      // }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      ;(session as any).accessToken = token.accessToken
      return session
    },
  },
})
