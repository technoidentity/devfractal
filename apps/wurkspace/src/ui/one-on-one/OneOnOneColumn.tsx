import { Box, Flex, Text } from '@chakra-ui/react'
import type { Category } from '@specs/enums'
import type { Card } from '@specs/oneOnOne'
import { isAction } from '@specs/oneOnOne'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { ActionCard } from './ActionCard'
import { DiscussionCard } from './DiscussionCard'

type HeaderProps = Readonly<{
  bg: string
  text: string
}>

const Header = ({ bg, text }: HeaderProps) => {
  return (
    <Flex bg={bg} h="50px" align="center" pl="12px">
      <Text>{text}</Text>
    </Flex>
  )
}

type BodyProps = Readonly<{
  cards: readonly Card[]
  category: Category
  onCardClick(a: Card): void
}>

const Body = ({ category, cards, onCardClick }: BodyProps) => (
  <Flex alignItems="stretch" direction="column" mt="30px">
    <Droppable key={category} droppableId={category}>
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {cards.map((card, index) =>
            isAction(card) ? (
              <ActionCard
                key={card.id}
                index={index}
                action={card}
                onActionClick={onCardClick}
              />
            ) : (
              <DiscussionCard
                key={`discussion-${card.id}`}
                index={index}
                discussion={card}
                onDiscussionClick={onCardClick}
              />
            ),
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </Flex>
)

const headerUIProps = {
  topOfMind: {
    bg: 'rgba(96, 91, 255, 0.24)',
    text: `What's on top of my mind`,
  },
  wentWell: {
    bg: '#47EBFF',
    text: 'Things that went well this week',
  },
  learnings: {
    bg: '#FFC7D4',
    text: 'Learnings',
  },
  priorities: {
    bg: 'rgba(96, 91, 255, 0.24)',
    text: 'Priorities until we meet again',
  },
  challenges: {
    bg: '#F9DA80',
    text: 'Challenges/Roadblocks',
  },
  feedback: {
    bg: 'green.200',
    text: 'Feedback',
  },
}

export type OneOnOneColumnProps = Readonly<{
  cards: readonly Card[]
  category: Category
  onCardClick(d: Card): void
}>

export const OneOnOneColumn = ({
  cards,
  category,
  onCardClick,
}: OneOnOneColumnProps) => {
  return (
    <Box minW="308px" flexGrow="1" bg="#ECF0F2" alignItems="stretch">
      <Header
        bg={headerUIProps[category].bg}
        text={headerUIProps[category].text}
      />

      <Body category={category} cards={cards} onCardClick={onCardClick} />
    </Box>
  )
}
