import { useDisclosure } from '@chakra-ui/react'
import { Card, isAction, isDiscussion } from '@specs/oneOnOne'
import { Action } from '@specs/action'
import { Discussion } from '@specs/discussion'
import { LoadingScreen } from '@ui/LoadingScreen'
import { useCardMutations, useCards, useSupabase } from '@ui/queries'
import React from 'react'
import { ErrorMessage } from '../core'
import { ActionPopUp } from './ActionPopup'
import { DiscussionPopUp } from './DiscussionPopup'
import { Header } from './Header'
import { OneOnOneView } from './OneonOneView'

export type OneOnOneProps = Readonly<{
  meetingId: string
}>

export const OneOnOne = ({ meetingId }: OneOnOneProps) => {
  useSupabase()

  const [action, setAction] = React.useState<Action | undefined>()
  const [discussion, setDiscussion] = React.useState<Discussion | undefined>()

  const actionDisclosure = useDisclosure()
  const discussionDisclosure = useDisclosure()

  const { cards, error, queryKey } = useCards(meetingId)
  const { mutateAction, mutateDiscussion } = useCardMutations(queryKey)

  const handleActionSubmit = React.useCallback(
    (action: Action) => {
      mutateAction(action)
      setAction(undefined)
    },
    [mutateAction],
  )

  const handleDiscussionSubmit = React.useCallback(
    (card: Discussion) => {
      mutateDiscussion(card)
      setDiscussion(undefined)
    },
    [mutateDiscussion],
  )

  const handleCardClick = React.useCallback(
    (card: Card) => {
      if (isAction(card)) {
        setAction(card)
        actionDisclosure.onOpen()
      } else if (isDiscussion(card)) {
        setDiscussion(card)
        discussionDisclosure.onOpen()
      } else {
        throw Error('Unknown card')
      }
    },
    [actionDisclosure, discussionDisclosure],
  )

  const handleDrageCard = React.useCallback(
    (card: Card) => {
      if (isAction(card)) {
        mutateAction(card)
      } else if (isDiscussion(card)) {
        mutateDiscussion(card)
      } else {
        throw new Error('unknown card')
      }
    },
    [mutateAction, mutateDiscussion],
  )

  if (error) {
    return <ErrorMessage error={error} />
  }

  if (!cards) {
    return <LoadingScreen />
  }

  return (
    <div style={{ marginLeft: '60px' }}>
      <Header firstName={'@TODO: CHANGE THIS'} />

      <OneOnOneView
        cards={cards}
        onCardClick={handleCardClick}
        onDragCard={handleDrageCard}
      />

      {action && (
        <ActionPopUp
          action={action}
          onActionChange={setAction}
          onSubmit={handleActionSubmit}
          disclosure={actionDisclosure}
        />
      )}

      {discussion && (
        <DiscussionPopUp
          discussion={discussion}
          onDiscussionChange={setDiscussion}
          disclosure={discussionDisclosure}
          onSubmit={handleDiscussionSubmit}
        />
      )}
    </div>
  )
}
