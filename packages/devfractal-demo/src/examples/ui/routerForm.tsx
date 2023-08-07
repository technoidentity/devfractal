// import type { FormProps } from '@/ui/form'
// import { FormContext, useFormContext } from '@/ui/form'
// import { createFormContext, useForm, zodResolver } from '@mantine/form'
// import { getRawShape } from '@srtp/spec'
// import type { FormSpec } from '@srtp/validator'
// import React from 'react'

// import { useNavigation, useSubmit, Form as RouterForm } from 'react-router-dom'
// import invariant from 'tiny-invariant'
// import type { z } from 'zod'

// export const useSuccessfulSubmit = () => {
//   const [success, set] = React.useState(false)
//   const navigate = useNavigation()

//   React.useEffect(() => {
//     if (navigate.state === 'loading') {
//       set(true)
//     }
//   }, [navigate.state])

//   return success
// }

// function useOnSubmitOnSuccess<Spec extends FormSpec>(
//   onSubmit?: (values: z.infer<Spec>) => void,
// ) {
//   const { form } = useFormContext()
//   const success = useSuccessfulSubmit()

//   React.useEffect(() => {
//     if (success) {
//       onSubmit?.(form.values)
//     }
//   }, [form.values, onSubmit, success])
// }

// export function createClientForm<Spec extends FormSpec>(
//   spec: Spec,
//   initial?: z.infer<Spec>,
// ) {
//   type T = z.infer<Spec>
//   const [Provider, useContext] = createFormContext<T>()

//   const Form = ({
//     initialValues,
//     onSubmit,
//     children,
//     ...props
//   }: FormProps<Spec>) => {
//     invariant(
//       initialValues !== undefined || initial !== undefined,
//       'You must provide initialValues to form',
//     )

//     const form = useForm({
//       initialValues: initialValues ?? initial,
//       validateInputOnBlur: true,
//       ...props,
//       validate: zodResolver(spec),
//     })

//     const value = React.useMemo(
//       () =>
//         ({
//           form,
//           useContext,
//           spec: getRawShape(spec),
//         }) as const,
//       [form],
//     )
//     const submit = useSubmit()
//     useOnSubmitOnSuccess(onSubmit)

//     return (
//       <Provider form={form}>
//         <FormContext value={value}>
//           <RouterForm
//             {...props}
//             onSubmit={form.onSubmit((_, event) => {
//               submit(event.currentTarget, {
//                 replace: true,
//                 method: props.method,
//               })
//             })}
//           >
//             {children}
//           </RouterForm>
//         </FormContext>
//       </Provider>
//     )
//   }

//   // eslint-disable-next-line @typescript-eslint/naming-convention
//   return [Form, useFormContext] as const
// }

export const routerForm = 1
