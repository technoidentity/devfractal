import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { isStr } from '@srtp/core'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let db: SupabaseClient | undefined

declare global {
  // eslint-disable-next-line no-var
  var supabaseDb: SupabaseClient | undefined
}

if (isStr(supabaseUrl) && isStr(supabaseAnonKey)) {
  // this is needed because in development we don't want to restart
  // the server with every change, but we want to make sure we don't
  // create a new connection to the DB with every change either.
  if (process.env.NODE_ENV === 'production') {
    db = createClient(supabaseUrl, supabaseAnonKey)
  } else {
    if (!global.supabaseDb) {
      global.supabaseDb = createClient(supabaseUrl, supabaseAnonKey)
    }
    db = global.supabaseDb
  }
}

export { db as supabase }
