import { Flex } from '@chakra-ui/react'
import { groupBy } from '@fun'
import { Category } from '@specs/enums'
import { Card } from '@specs/oneOnOne'
import React, { useMemo } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { z } from 'zod'
import { OneOnOneColumn } from './OneOnOneColumn'

const OneOnOneViewProps = z.object({
  cards: z.array(Card),
})

export type OneOnOneViewProps = Readonly<
  z.infer<typeof OneOnOneViewProps> & {
    onCardClick(a: Card): void
    onDragCard(src: Card): void
  }
>

export const OneOnOneView = (props: OneOnOneViewProps) => {
  // OneOnOneViewProps.parse(props)

  const grouped = useMemo(
    () => groupBy(props.cards, c => c.category),
    [props.cards],
  )

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId) {
      return
    }

    const srcCategory = Category.parse(source.droppableId)
    const destCategory = Category.parse(destination.droppableId)
    props.onDragCard({
      ...grouped[srcCategory][source.index],
      category: destCategory,
    })
  }

  return (
    <Flex minH="90vh">
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.keys(Category.Values).map(cat => (
          <OneOnOneColumn
            key={cat}
            cards={grouped[cat as Category] || []}
            category={cat as Category}
            onCardClick={props.onCardClick}
          />
        ))}
      </DragDropContext>
    </Flex>
  )
}
