import {
  Avatar,
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import { Discussion } from '@specs/discussion'
import { Draggable } from 'react-beautiful-dnd'

export interface DiscussionCardProps {
  readonly discussion: Discussion
  index: number
  onDiscussionClick(discussion: Discussion): void
}

export const DiscussionCard = ({
  discussion,
  index,
  onDiscussionClick,
}: DiscussionCardProps) => {
  return (
    <Draggable draggableId={`disscussion-${discussion.id}`} index={index}>
      {provided => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          p="12px"
          pb="18px"
          m="4px"
          bg="#FFFFFF"
          overflow="hidden"
          borderRadius="5px"
          h="90px"
          minW="270px"
          onClick={() => onDiscussionClick(discussion)}
        >
          <HStack align="flex-start">
            <Text fontSize="sm" flex="1">
              {discussion.discussion}
            </Text>

            <VStack>
              <Wrap>
                <WrapItem>
                  <Avatar size="sm" src="./user.svg" />
                </WrapItem>
              </Wrap>
              <Icon as={FiMoreHorizontal} color="#9A9AA9" boxSize={6} />
            </VStack>
          </HStack>
        </Box>
      )}
    </Draggable>
  )
}
