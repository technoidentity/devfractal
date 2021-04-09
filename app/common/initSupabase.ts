import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://otoxlpgpvoyvcgcquhud.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzcxNTI5OSwiZXhwIjoxOTMzMjkxMjk5fQ.GZxBwhSWvVNRyoF73YEp27WbtgBBLPs1kZ2ztIqQJm0',
)
