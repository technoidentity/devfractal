// import { CalendarIcon } from '@radix-ui/react-icons'
// import { format } from 'date-fns'
// import * as React from 'react'

// import { cn } from '@/core'
// import { Button } from '@/ui/button'
// import { Calendar } from '@/ui/calendar'
// import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'

// export type DatePickerProps = React.ComponentProps<typeof Calendar> &
//   Readonly<{
//     name: string
//   }>

// export const DatePickerField = ({ className, name, ...props }) => {
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={'outline'}
//           className={cn(
//             'w-[240px] justify-start text-left font-normal',
//             !date && 'text-muted-foreground',
//           )}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {date ? format(date, 'PPP') : <span>Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0" align="start">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           initialFocus
//         />
//       </PopoverContent>
//     </Popover>
//   )
// }

// export function DatePickerDemo() {
//   const [date, setDate] = React.useState<Date>()

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={'outline'}
//           className={cn(
//             'w-[240px] justify-start text-left font-normal',
//             !date && 'text-muted-foreground',
//           )}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {date ? format(date, 'PPP') : <span>Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0" align="start">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           initialFocus
//         />
//       </PopoverContent>
//     </Popover>
//   )
// }
export const datePickerField = 1
