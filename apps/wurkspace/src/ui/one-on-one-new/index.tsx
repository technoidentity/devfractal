import { ErrorMessage, useAuth } from '@ui/core'
import { useSafeQuery } from '@ui/core/useApi'
import type { MeetingResponse } from '@ui/responses'
import { useState } from 'react'
import { FiClock } from 'react-icons/fi'
import { any } from 'zod'
import { Board } from './Board'
import { MeetingButton } from './MeetingButton'

const boardData = [
  {
    id: 1,
    text: "What's on top of my mind",
    bgColor: '#605BFF3D',
    boardBGColor: '200',
  },
  {
    id: 2,
    text: 'Things that went well this week',
    bgColor: '#47EBFF99',
    boardBGColor: '100',
  },
  {
    id: 3,
    text: 'Learnings',
    bgColor: '#FFC7D4',
    boardBGColor: '200',
  },
  {
    id: 4,
    text: 'Priorities until we meet again',
    bgColor: '#92B1EE',
    boardBGColor: '100',
  },
  {
    id: 5,
    text: 'Challenges/Roadblocks',
    bgColor: '#F9DA80',
    boardBGColor: '200',
  },
  {
    id: 6,
    text: 'Feedback',
    bgColor: '#68BF7396',
    boardBGColor: '100',
  },
]

interface Props {
  meeting: MeetingResponse
}

export const OneOnOneNew = ({ meeting }: Props) => {
  // @TODO: extract hook
  const { data, error } = useSafeQuery({
    key: ['google', meeting.id],
    spec: any(),
  })

  const [session] = useAuth()
  // these variable used for checking if the meeting is stared or not
  const [isMeetStart, setIsMeetStart] = useState(false)

  // these variable for checking if the discussion card exist in board or not. corresponding this will show the alert model popup
  const [isDiscussionCardExist, setIsDiscussionCardExist] =
    useState<boolean>(false)

  if (error) {
    return <ErrorMessage error={error} />
  }

  // @TODO: use data!
  console.log({ data })

  // formatting the date which is in the string format
  const formatDate = (date: string | number | Date) => {
    const d = new Date(date)
    const day = d.getDate()
    const month = d.toDateString().substr(4, 3)
    const year = d.getFullYear()
    const formatD = `${month} ${day}, ${year}`

    return formatD
  }
  const getOther = (meeting: MeetingResponse) => {
    return session.user?.email !== meeting.calendarEvent.attendee1Email
      ? meeting.calendarEvent.attendee1Email
      : meeting.calendarEvent.attendee2Email
  }

  // get the day, month and year from the string date format
  const meetDate = formatDate(meeting.startTime!)

  return (
    <div className="font-nunito flex flex-col  ml-[75px]">
      {/* Header of the one-on-one page */}
      <div className="flex mt-[19.76px] items-center">
        {/* chat svg */}
        <div>
          <svg
            width="29"
            height="25.49"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1279_810)">
              <path
                d="M26.4512 11.9512H25.5449V4.30469C25.5442 3.62893 25.2754 2.98106 24.7976 2.50322C24.3197 2.02539 23.6719 1.75661 22.9961 1.75586H2.54883C1.87307 1.75661 1.2252 2.02539 0.747362 2.50322C0.269527 2.98106 0.000749597 3.62893 0 4.30469L0 17.8984C0.000749597 18.5742 0.269527 19.2221 0.747362 19.6999C1.2252 20.1777 1.87307 20.4465 2.54883 20.4473H3.39844V24.6953C3.39836 24.8634 3.44815 25.0277 3.5415 25.1675C3.63485 25.3073 3.76757 25.4163 3.92286 25.4806C4.07816 25.545 4.24904 25.5618 4.4139 25.529C4.57876 25.4961 4.73018 25.4152 4.849 25.2963L9.69744 20.4473H13.6504V21.2969C13.6511 21.9726 13.9199 22.6205 14.3978 23.0983C14.8756 23.5762 15.5235 23.845 16.1992 23.8457H20.9451L24.0944 26.9955C24.2132 27.1144 24.3646 27.1954 24.5295 27.2282C24.6943 27.261 24.8652 27.2442 25.0205 27.1798C25.1758 27.1155 25.3085 27.0065 25.4019 26.8667C25.4952 26.727 25.545 26.5626 25.5449 26.3945V23.8457H26.4512C27.1269 23.845 27.7748 23.5762 28.2526 23.0983C28.7305 22.6205 28.9993 21.9726 29 21.2969V14.5C28.9993 13.8242 28.7305 13.1764 28.2526 12.6985C27.7748 12.2207 27.1269 11.9519 26.4512 11.9512ZM9.3457 18.748C9.23411 18.748 9.1236 18.7699 9.02049 18.8126C8.91738 18.8553 8.82368 18.9178 8.74475 18.9967L5.09766 22.6444V19.5977C5.09766 19.3723 5.00814 19.1562 4.84881 18.9969C4.68948 18.8376 4.47338 18.748 4.24805 18.748H2.54883C2.3235 18.748 2.1074 18.6585 1.94806 18.4992C1.78873 18.3399 1.69922 18.1238 1.69922 17.8984V4.30469C1.69922 4.07936 1.78873 3.86326 1.94806 3.70392C2.1074 3.54459 2.3235 3.45508 2.54883 3.45508H22.9961C23.2214 3.45508 23.4375 3.54459 23.5969 3.70392C23.7562 3.86326 23.8457 4.07936 23.8457 4.30469V11.9512H16.1992C15.5235 11.9519 14.8756 12.2207 14.3978 12.6985C13.9199 13.1764 13.6511 13.8242 13.6504 14.5V18.748H9.3457Z"
                fill="#605BFF"
              />
              <path
                d="M22.8985 15.3515L20.077 18.1031L19.1015 17.1513C18.8707 16.9262 18.5575 16.7997 18.231 16.7997C17.9045 16.7997 17.5914 16.9262 17.3606 17.1513C17.1297 17.3763 17 17.6816 17 17.9999C17 18.3182 17.1297 18.6235 17.3606 18.8486L19.2065 20.6483C19.3208 20.7598 19.4565 20.8483 19.6059 20.9086C19.7552 20.9689 19.9153 21 20.077 21C20.2387 21 20.3988 20.9689 20.5481 20.9086C20.6975 20.8483 20.8332 20.7598 20.9475 20.6483L24.6394 17.0489C24.8703 16.8238 25 16.5185 25 16.2002C25 15.8819 24.8703 15.5766 24.6394 15.3515C24.4086 15.1264 24.0955 15 23.769 15C23.4425 15 23.1293 15.1264 22.8985 15.3515Z"
                fill="white"
              />
              <path
                d="M11.1016 13.6504H5.94727C5.72194 13.6504 5.50583 13.7399 5.3465 13.8992C5.18717 14.0586 5.09766 14.2747 5.09766 14.5C5.09766 14.7253 5.18717 14.9414 5.3465 15.1008C5.50583 15.2601 5.72194 15.3496 5.94727 15.3496H11.1016C11.3269 15.3496 11.543 15.2601 11.7023 15.1008C11.8617 14.9414 11.9512 14.7253 11.9512 14.5C11.9512 14.2747 11.8617 14.0586 11.7023 13.8992C11.543 13.7399 11.3269 13.6504 11.1016 13.6504Z"
                fill="#605BFF"
              />
              <path
                d="M12.8008 10.252H5.94727C5.72194 10.252 5.50583 10.3415 5.3465 10.5008C5.18717 10.6601 5.09766 10.8762 5.09766 11.1016C5.09766 11.3269 5.18717 11.543 5.3465 11.7023C5.50583 11.8617 5.72194 11.9512 5.94727 11.9512H12.8008C13.0261 11.9512 13.2422 11.8617 13.4015 11.7023C13.5609 11.543 13.6504 11.3269 13.6504 11.1016C13.6504 10.8762 13.5609 10.6601 13.4015 10.5008C13.2422 10.3415 13.0261 10.252 12.8008 10.252Z"
                fill="#605BFF"
              />
              <path
                d="M5.94727 8.55273H19.5977C19.823 8.55273 20.0391 8.46322 20.1984 8.30389C20.3578 8.14456 20.4473 7.92846 20.4473 7.70312C20.4473 7.47779 20.3578 7.26169 20.1984 7.10236C20.0391 6.94303 19.823 6.85352 19.5977 6.85352H5.94727C5.72194 6.85352 5.50583 6.94303 5.3465 7.10236C5.18717 7.26169 5.09766 7.47779 5.09766 7.70312C5.09766 7.92846 5.18717 8.14456 5.3465 8.30389C5.50583 8.46322 5.72194 8.55273 5.94727 8.55273Z"
                fill="#605BFF"
              />
            </g>
            <defs>
              <clipPath id="clip0_1279_810">
                <rect width="29" height="29" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <h1 className="leading-[30px] font-bold text-[#605BFF] ml-2">
          One-on-one with {getOther(meeting)}
        </h1>
        {/* Buttons for Start the meeting and Ending the Meeting */}
        {/* TODO: This implementation must be change once data getting from the DB */}
        <MeetingButton
          isDiscussionCardExist={isDiscussionCardExist}
          isMeetStart={isMeetStart}
          setIsMeetStart={setIsMeetStart}
        />
      </div>
      {/* Boards start from here */}
      <div className="flex-1 -ml-3 mt-[25px] min-w-max">
        <div className="absolute mt-16 ml-[16px] inline-flex items-center">
          <div className="w-[14.17px] h-[14.17px]">
            <FiClock />
          </div>
          <h1 className="w-[91px] text-sm font-semibold ml-2 mt-1">
            {meetDate}
          </h1>
          <div className=" ml-px divide-y divide-dashed divide-gray-500 w-[1723px]">
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="flex">
          {/* Displaying the boards on the page */}
          {boardData.map(item => (
            <div key={item.id}>
              <Board
                id={item.id}
                text={item.text}
                bgColor={item.bgColor}
                boardBGColor={item.boardBGColor}
                isMeetStart={isMeetStart}
                meetDate={meetDate}
                setIsDiscussionCardExist={setIsDiscussionCardExist}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
