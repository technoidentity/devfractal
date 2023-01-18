/* eslint-disable arrow-body-style */
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Container,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { FaCheckSquare } from 'react-icons/fa'

interface CheckboxListProps {
  readonly options: readonly string[]
  readonly selected: readonly string[]
  onSelectionChange(values: readonly string[]): void
}

export const CheckboxList: React.FC<CheckboxListProps> = ({
  options,
  selected,
  onSelectionChange,
}) => {
  return (
    <VStack align="flex-start" overflowY="scroll">
      <CheckboxGroup
        colorScheme="green"
        value={options as string[]}
        onChange={values => onSelectionChange(values.map(v => v.toString()))}
      >
        {selected.map(value => (
          <Container key={value}>
            <Checkbox value={value}>{value}</Checkbox>
          </Container>
        ))}
      </CheckboxGroup>
    </VStack>
  )
}

interface MultiSelectProps {
  readonly defaultValues: readonly string[]
  onSubmit(values: readonly string[]): void
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const [checkedValues, setCheckedValues] =
    React.useState<readonly string[]>(defaultValues)

  return (
    <>
      <Box display="inline-block" fontWeight="bold" mr={3}>
        Select Column
      </Box>
      <Popover placement="right">
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <IconButton
                colorScheme="teal"
                aria-label="select"
                size="sm"
                icon={<FaCheckSquare />}
              />
            </PopoverTrigger>

            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader fontWeight="semibold">
                Confirm here {''}
                <span>Rearrange here</span>
              </PopoverHeader>
              <PopoverBody>
                <CheckboxList
                  selected={defaultValues}
                  options={checkedValues}
                  onSelectionChange={setCheckedValues}
                />
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
                <ButtonGroup size="sm">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    type="submit"
                    onClick={() => {
                      onSubmit(checkedValues)
                      onClose()
                    }}
                  >
                    Apply
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </>
        )}
      </Popover>
    </>
  )
}
