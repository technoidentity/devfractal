import type { useDisclosure } from '@chakra-ui/react'
import {
  Box,
  Center,
  Circle,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import type { Action } from '@specs/action'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { string } from 'zod'

export type ActionPopupProps = Readonly<{
  action: Action
  disclosure: ReturnType<typeof useDisclosure>
  onActionChange(values: Action): void
  onSubmit(value: Action): void
}>

export const ActionPopUp = ({
  action,
  disclosure,
  onActionChange,
  onSubmit,
}: ActionPopupProps) => (
  <>
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      {/* <ModalOverlay /> */}
      <ModalContent maxW="577px" h="295px">
        <ModalBody pl="0px" pr="0px">
          <VStack align="stretch">
            <HStack spacing="24px" pl="18px">
              {/* <Select
                  fontSize="16px"
                  bg="rgba(154, 154, 169, 0.1)"
                  border="1px solid rgba(196, 196, 196, 0.3)"
                  borderRadius="5px"
                  boxSizing="border-box"
                  size="sm"
                  w="120px"
                  value={select}
                  onChange={evt => {
                    setSelect(CardSelection.parse(evt.target.value))
                  }}
                >
                  {options.map(option => (
                    <option key={option} value={option}>
                      {capitalize(option)}
                    </option>
                  ))}
                </Select> */}

              <Box>
                <Text fontSize="xs">Due on</Text>
                <Text fontSize="sm" color=" rgba(96, 91, 255, 1)">
                  {action.dueDate.toISOString()}
                </Text>
              </Box>

              <Center height="29px">
                <Divider
                  orientation="vertical"
                  border="1px solid rgba(221, 221, 221, 1)"
                />
              </Center>

              <Box>
                <Text fontSize="xs">{action.assignedToId}</Text>
                <Text fontSize="sm" color=" rgba(96, 91, 255, 1)">
                  John Doe
                </Text>
              </Box>

              <Center height="29px">
                <Divider
                  orientation="vertical"
                  border="1px solid rgba(221, 221, 221, 1)"
                />
              </Center>

              <Box>
                <Text fontSize="xs">Added by</Text>
                <Text fontSize="sm" color=" rgba(96, 91, 255, 1)">
                  {action.addedById}
                </Text>
              </Box>
            </HStack>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="80px"
              background="rgba(193, 191, 255, 0.3)"
            >
              <Box as="span" ml="20px">
                {action.description}
              </Box>
            </Box>
            <Box pl="18px" pr="18px">
              <Text mb="7px">Your Progress</Text>
              <Textarea
                css={{ border: '1px solid #C4C4C4' }}
                borderRadius="5px"
                value={string().parse(action.progress)}
                onChange={evt =>
                  onActionChange({ ...action, progress: evt.target.value })
                }
              />
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter pt="0px">
          <Circle
            size="29px"
            onClick={() => {
              onSubmit(action)
            }}
            bg="rgba(96, 91, 255, 1)"
            color="white"
          >
            <FaArrowRight />
          </Circle>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
)
