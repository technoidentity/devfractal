import {
  Button,
  Checkbox,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  PinInput,
  PinInputField,
  Radio,
  RadioGroup,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Switch,
  Text,
  Textarea,
} from '@chakra-ui/react'
import type { FieldConfig } from '@conform-to/react'
import { conform, useInputEvent } from '@conform-to/react'
import { useRef, useState } from 'react'
import { z } from 'zod'
import { createClientForm } from './ClientForm'

const schema = z.object({
  email: z.string().email().min(1, 'Email is required'),
  language: z.string().min(1, 'Language is required'),
  description: z.string().min(1, 'Description is required'),
  quantity: z.coerce.number().min(1, 'Quantity is required'),
  pin: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  progress: z.coerce.number().min(1, 'Progress is required'),
  // ranges: z.array(z.coerce.number()).min(1, 'Ranges is required'),
  subscribe: z.coerce.boolean(),
  enabled: z.coerce.boolean(),
  active: z.coerce.boolean(),
})

const [ClientForm, useClientForm] = createClientForm(schema)

const Fields = () => {
  const [, fields] = useClientForm()

  return (
    <>
      <FormControl isInvalid={Boolean(fields.email.error)}>
        <FormLabel>Email (Input)</FormLabel>
        <Input type="email" name={fields.email.name} required />
        <FormErrorMessage>{fields.email.error}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(fields.language.error)}>
        <FormLabel>Language (Select)</FormLabel>
        <Select
          name={fields.language.name}
          placeholder="Select option"
          required
        >
          <option value="english">English</option>
          <option value="deutsche">Deutsch</option>
          <option value="japanese">Japanese</option>
        </Select>
        <FormErrorMessage>{fields.language.error}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(fields.description.error)}>
        <FormLabel>Description (Textarea)</FormLabel>
        <Textarea name={fields.description.name} required />
        <FormErrorMessage>{fields.description.error}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(fields.quantity.error)}>
        <FormLabel>Quantity (NumberInput)</FormLabel>
        <ExampleNumberInput
          name={fields.quantity.name}
          required
          min={1}
          max={10}
          step={1}
        />
        <FormErrorMessage>{fields.quantity.error}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(fields.pin.error)}>
        <FormLabel>PIN (PinInput)</FormLabel>
        <ExamplePinInput
          name={fields.pin.name}
          isInvalid={Boolean(fields.pin.error)}
          required
          pattern="[0-9]{4}"
        />
        <FormErrorMessage>{fields.pin.error}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(fields.title.error)}>
        <FormLabel>Title (Editable)</FormLabel>
        <Editable
          defaultValue={fields.title.defaultValue}
          placeholder="No content"
        >
          <EditablePreview />
          <EditableInput name={fields.title.name} required />
        </Editable>
        <FormErrorMessage>{fields.title.error}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(fields.subscribe.error)}>
        <FormLabel>Subscribe (Checkbox)</FormLabel>
        <Checkbox name={fields.subscribe.name} value="yes" required>
          Newsletter
        </Checkbox>
        <FormErrorMessage>{fields.subscribe.error}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(fields.enabled.error)}>
        <FormLabel>Enabled (Switch)</FormLabel>
        <Switch name={fields.enabled.name} required />
        <FormErrorMessage>{fields.enabled.error}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(fields.progress.error)}>
        <FormLabel>Progress (Slider)</FormLabel>
        <ExampleSlider name={fields.progress.name} required />
        <FormErrorMessage>{fields.progress.error}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(fields.active.error)}>
        <FormLabel>Active (Radio)</FormLabel>
        <RadioGroup
          name={fields.active.name}
          defaultValue={fields.active.defaultValue}
        >
          <Stack spacing={5} direction="row">
            <Radio value="yes" isRequired={fields.active.required ?? true}>
              Yes
            </Radio>
            <Radio value="no" isRequired={fields.active.required ?? true}>
              No
            </Radio>
          </Stack>
        </RadioGroup>
        <FormErrorMessage>{fields.active.error}</FormErrorMessage>
      </FormControl>
    </>
  )
}

export function ConformExample() {
  return (
    <Container maxW="container.sm" paddingY={8}>
      <ClientForm onSuccess={console.log}>
        <Stack direction="column" spacing={8}>
          <header>
            <Heading mb={4}>Chakra UI Example</Heading>
            <Text fontSize="xl">
              This shows you how to integrate forms components with Conform.
            </Text>
          </header>
          <Fields />
          <Stack direction="row" justifyContent="flex-end">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button
              type="submit"
              variant="solid"
              name={conform.INTENT}
              value="buy-now"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </ClientForm>
    </Container>
  )
}

function ExampleNumberInput(config: FieldConfig<number>) {
  const [value, setValue] = useState(config.defaultValue ?? '')
  const [inputRef, control] = useInputEvent({
    onReset: () => setValue(config.defaultValue ?? ''),
  })
  const ref = useRef<HTMLInputElement>(null)

  return (
    <>
      <input
        ref={inputRef}
        {...conform.input(config, { hidden: true })}
        onChange={e => setValue(e.target.value)}
        onFocus={() => inputRef.current?.focus()}
      />
      <NumberInput
        ref={ref}
        isRequired={config.required}
        value={value}
        onChange={control.change}
      >
        <NumberInputField ref={ref} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  )
}

function ExamplePinInput({
  isInvalid,
  ...config
}: FieldConfig<string> & { isInvalid: boolean }) {
  const [value, setValue] = useState(config.defaultValue ?? '')
  const [inputRef, control] = useInputEvent({
    onReset: () => setValue(config.defaultValue ?? ''),
  })
  const ref = useRef<HTMLInputElement>(null)

  return (
    <>
      <input
        ref={inputRef}
        {...conform.input(config, { hidden: true })}
        onChange={e => setValue(e.target.value)}
        onFocus={() => inputRef.current?.focus()}
      />
      <PinInput
        type="alphanumeric"
        value={value}
        onChange={control.change}
        isInvalid={isInvalid}
      >
        <PinInputField ref={ref} />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </>
  )
}

function ExampleSlider(config: FieldConfig<number>) {
  const [value, setValue] = useState(config.defaultValue ?? '')
  const [inputRef, control] = useInputEvent({
    onReset: () => setValue(config.defaultValue ?? ''),
  })

  return (
    <>
      <input
        ref={inputRef}
        {...conform.input(config, { hidden: true })}
        onChange={e => setValue(e.target.value)}
        onFocus={() => inputRef.current?.focus()}
      />
      <Slider
        value={value ? Number(value) : undefined}
        onChange={value => control.change(`${value}`)}
        onFocus={control.focus}
        onBlur={control.blur}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </>
  )
}
