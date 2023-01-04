import {
  Avatar,
  Box,
  Checkbox,
  Circle,
  HStack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { FiCalendar } from 'react-icons/fi'
import type { Action } from '@specs/action'
import { Draggable } from 'react-beautiful-dnd'

export interface ActionCardProps {
  readonly action: Action
  index: number
  onActionClick(action: Action): void
}

export const ActionCard = ({
  action,
  index,
  onActionClick,
}: ActionCardProps) => {
  const date = action.dueDate

  return (
    <Draggable
      draggableId={`action-${action.id}`}
      index={index}
      key={action.id}
    >
      {provided => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          m="4px"
          p="12px"
          bg="#E1E4F3"
          overflow="hidden"
          borderRadius="5px"
          maxW="98%"
          h="90px"
          flexGrow="1"
          onClick={() => onActionClick(action)}
        >
          <HStack>
            <Checkbox size="md" flexGrow="1">
              {action.description}
            </Checkbox>

            <Wrap>
              <WrapItem>
                <Avatar size="sm" src="./user.svg" />
              </WrapItem>
            </Wrap>
          </HStack>
          <HStack mt="8px" pl="18px">
            <Circle size="19px" bg="#9A9AA9" color="white">
              <FiCalendar />
            </Circle>
            <Text fontSize="xs">
              Due on {format(new Date(date), 'dd-MM-yyyy')}
            </Text>
          </HStack>
        </Box>
      )}
    </Draggable>
  )
}
