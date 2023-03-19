import { str } from '@srtp/spec'
import { OneOnOne } from '@ui/one-on-one'
import { useRouter } from 'next/router'

export default function OneOnOnePage() {
  const router = useRouter()

  const meetingId = str(router.query.meetingId)

  return <OneOnOne meetingId={meetingId} />
}
