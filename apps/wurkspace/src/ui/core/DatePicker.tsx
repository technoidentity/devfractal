import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export function DatePickerView() {
  const [startDate, setStartDate] = useState(new Date())

  return (
    <div className="customDatePickerWidth">
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date as Date)}
        dateFormat="MMM d, yyyy"
        minDate={new Date()}
        filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
        className="text-[15px] text-[#605BFF] font-semibold "
      />
    </div>
  )
}
