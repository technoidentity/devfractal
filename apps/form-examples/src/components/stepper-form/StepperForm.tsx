import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  Code,
  ColorInput,
  Container,
  FileInput,
  Group,
  JsonInput,
  MultiSelect,
  NativeSelect,
  NumberInput,
  PasswordInput,
  Radio,
  Rating,
  SegmentedControl,
  Select,
  Slider,
  Stepper,
  Switch,
  Textarea,
  TextInput,
} from '@mantine/core'
import { Calendar, DatePickerInput, TimeInput } from '@mantine/dates'
import { useForm, zodResolver } from '@mantine/form'
import { useState } from 'react'
import {
  initialValues,
  StepOneSchema,
  StepThreeSchema,
  StepTwoSchema,
} from './spec'
import { jstr } from '@srtp/core'

const countriesData = [
  { label: 'United States', value: 'US' },
  { label: 'Great Britain', value: 'GB' },
  { label: 'Finland', value: 'FI' },
  { label: 'France', value: 'FR' },
  { label: 'Russia', value: 'RU' },
]

// const useStepForm = () => {
//   const [active, setActive] = useState(0)

//   const form = useForm({
//     initialValues,
//     validate:
//       active === 0
//         ? zodResolver(StepOneSchema)
//         : active === 1
//         ? zodResolver(StepTwoSchema)
//         : active === 2
//         ? zodResolver(StepThreeSchema)
//         : {},
//   })

//   const nextStep = () => {
//     console.log(form.validate().hasErrors, form.validate().errors)
//     setActive(current => {
//       if (form.validate().hasErrors) {
//         return current
//       }
//       return current < 3 ? current + 1 : current
//     })
//   }

//   const prevStep = () =>
//     setActive(current => (current > 0 ? current - 1 : current))
// }

export const StepperForm = () => {
  const [active, setActive] = useState(0)

  const form = useForm({
    initialValues,
    validate:
      active === 0
        ? zodResolver(StepOneSchema)
        : active === 1
        ? zodResolver(StepTwoSchema)
        : active === 2
        ? zodResolver(StepThreeSchema)
        : {},
  })

  const nextStep = () => {
    console.log(form.validate().hasErrors, form.validate().errors)
    setActive(current => {
      if (form.validate().hasErrors) {
        return current
      }
      return current < 3 ? current + 1 : current
    })
  }

  const prevStep = () =>
    setActive(current => (current > 0 ? current - 1 : current))

  return (
    <Container mt="xl" w="700px">
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step label="First step" description="Profile settings">
          <TextInput
            label="Username"
            placeholder="Username"
            {...form.getInputProps('username')}
          />
          <TextInput
            label="Email"
            placeholder="Email"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            mt="md"
            label="Password"
            placeholder="Password"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            mt="md"
            label="ConfirmPassword"
            placeholder="ConfirmPassword"
            {...form.getInputProps('confirmPassword')}
          />
          <NativeSelect
            data={['React', 'Vue', 'Angular', 'Svelte']}
            label="Select your favorite framework/library"
            description="This is anonymous"
            {...form.getInputProps('library')}
            mt="md"
          />
          <Chip
            defaultChecked
            {...form.getInputProps('fullStackDeveloper')}
            mt="md"
          >
            FullStack Developer
          </Chip>
          <Select
            label="Your favorite  types library"
            placeholder="Pick one"
            mt="md"
            data={[
              { value: 'typescript', label: 'Typescript' },
              { value: 'zod', label: 'Zod' },
              { value: 'io-ts', label: 'io-ts' },
            ]}
            {...form.getInputProps('typeLibrary')}
          />

          <Radio.Group
            name="yearsOfExperience"
            mt="md"
            label="Years of Experience"
            description="This is anonymous"
            {...form.getInputProps('yearsOfExperience')}
          >
            <Radio value="fresher" label="Fresher" />
            <Radio value="below5Years" label="Below 5 years" />
            <Radio value="above5Years" label="Above 5 Years" />
          </Radio.Group>
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Personal information">
          <JsonInput
            label="Your package.json"
            placeholder="Textarea will autosize to fit the content"
            validationError="Invalid json"
            formatOnBlur
            autosize
            minRows={4}
            {...form.getInputProps('json')}
          />
          <MultiSelect
            data={countriesData}
            label="Preferred Job Location"
            placeholder="Pick all that you like"
            mt="sm"
            {...form.getInputProps('location')}
          />
          <NumberInput
            defaultValue={18}
            placeholder="Your age"
            label="Your age"
            mt="sm"
            {...form.getInputProps('age')}
          />
          <Calendar {...form.getInputProps('dateOfBirth')} />
          <Textarea
            placeholder="Previous Job Description"
            label="Previous Job Description"
            mt="sm"
            {...form.getInputProps('previousJob')}
          />
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Social media">
          <SegmentedControl
            data={[
              { label: 'React', value: 'react' },
              { label: 'Angular', value: 'ng' },
              { label: 'Vue', value: 'vue' },
              { label: 'Svelte', value: 'svelte' },
            ]}
            mt="sm"
            {...form.getInputProps('segmentedControl')}
          />
          <Slider
            marks={[
              { value: 20, label: '20%' },
              { value: 50, label: '50%' },
              { value: 80, label: '80%' },
            ]}
            mt="md"
            {...form.getInputProps('slider')}
          />
          <Autocomplete
            mt="md"
            label="Your favorite server framework/library"
            placeholder="Pick one"
            data={['express', 'remix', 'trpc', 'nextjs']}
            {...form.getInputProps('server')}
          />
          <FileInput
            mt="sm"
            placeholder="Pick file"
            label="Your resume"
            {...form.getInputProps('file')}
          />
          <ColorInput
            mt="sm"
            label="Favorite Color"
            {...form.getInputProps('color')}
          />
          <Rating mt="sm" defaultValue={2} {...form.getInputProps('rating')} />
          <DatePickerInput
            placeholder="Pick date"
            label="Date of Joining"
            mt="sm"
            {...form.getInputProps('dateOfJoining')}
          />
          <Switch
            mt="sm"
            label="I agree to sell my privacy"
            {...form.getInputProps('agree')}
          />
          <TimeInput
            mt="sm"
            label="What time is it now?"
            {...form.getInputProps('time')}
          />
          <Checkbox
            mt="sm"
            {...form.getInputProps('accept')}
            label="Accept terms and conditions"
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {jstr(form.values)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    </Container>
  )
}
