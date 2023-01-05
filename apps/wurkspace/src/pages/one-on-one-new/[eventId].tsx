import { str } from '@srtp/core'
import { ErrorMessage } from '@ui/core'
import { LoadingScreen } from '@ui/LoadingScreen'
import { OneOnOneNew } from '@ui/one-on-one-new'
import { useMeeting } from '@ui/queries'
import { useRouter } from 'next/router'
import React from 'react'

const OneOnOneNewPage = () => {
  const router = useRouter()
  const eventId = str(router.query.eventId)

  const { meeting, error } = useMeeting(eventId)

  if (error) {
    return <ErrorMessage error={error} />
  }

  if (meeting) {
    return <OneOnOneNew meeting={meeting} />
  }

  return <LoadingScreen />
}

export default OneOnOneNewPage
