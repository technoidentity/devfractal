import { capitalize } from '@fun'
import { useInterval } from '@ui/core/useInterval'
import { EndMeetAlert } from '@ui/alerts/EndMeetAlert'
import { StartMeetAlert } from '@ui/alerts/StartMeetAlert'
import { Duration, intervalToDuration } from 'date-fns'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { FiClock } from 'react-icons/fi'

type MeetingState = 'start meeting' | 'end meeting'

const durationTimeFormat = (date?: Duration): string => {
  const hours = date?.hours?.toString().padStart(2, '0') ?? '00'
  const minutes = date?.minutes?.toString().padStart(2, '0') ?? '00'
  const seconds = date?.seconds?.toString().padStart(2, '0') ?? '00'

  return `${hours}:${minutes}:${seconds}`
}

interface Props {
  isDiscussionCardExist: boolean
  isMeetStart: boolean
  setIsMeetStart: Dispatch<SetStateAction<boolean>>
}

export const MeetingButton = ({
  isDiscussionCardExist,
  isMeetStart,
  setIsMeetStart,
}: Props) => {
  const [state, setState] = React.useState<MeetingState>('start meeting')
  const [start, setStart] = React.useState<Date | undefined>()
  const [current, setCurrent] = React.useState<Date | undefined>()
  const [delay, setDelay] = React.useState<number | null>(1000)

  const [isEndMeetAlertOpen, setIsEndMeetAlertOpen] = useState<boolean>(false)
  const [isStartMeetAlertOpen, setIsStartMeetAlertOpen] = useState(false)

  // The following VARIABLE DATA we need to get from the backend DB
  const isDiscussionCardOpen = true

  const duration =
    current && start ? intervalToDuration({ start, end: current }) : undefined

  useInterval(() => {
    setCurrent(new Date())
  }, delay)

  const handleClick = () => {
    switch (state) {
      case 'start meeting':
        if (isDiscussionCardExist) {
          setStart(new Date())
          setState('end meeting')
          setIsMeetStart(!isMeetStart)
        } else {
          setIsStartMeetAlertOpen(true)
        }

        break
      case 'end meeting':
        if (isDiscussionCardOpen) {
          setIsEndMeetAlertOpen(!isEndMeetAlertOpen)
        } else {
          setDelay(null)
        }
        break
      default:
        return ''
    }
  }

  return (
    <>
      {/* Alert dialog modal for start meeting if we don't have discussion cards on the board */}
      {isStartMeetAlertOpen && (
        <div className="bg-gray-800 fixed bg-opacity-50 inset-0 flex justify-center items-center">
          <StartMeetAlert
            setState={setState}
            setStart={setStart}
            setIsStartMeetAlertOpen={setIsStartMeetAlertOpen}
            isMeetStart={isMeetStart}
            setIsMeetStart={setIsMeetStart}
          />
        </div>
      )}
      {/* Alert dialog modal for End meeting if we do have discussion cards open */}
      {isEndMeetAlertOpen && (
        <div className="bg-gray-800 fixed bg-opacity-50 inset-0 flex justify-center items-center z-10">
          <EndMeetAlert
            isMeetStart={isMeetStart}
            setIsMeetStart={setIsMeetStart}
            setIsEndMeetAlertOpen={setIsEndMeetAlertOpen}
          />
        </div>
      )}
      <div>
        <button
          onClick={handleClick}
          className="w-[124px] h-[35px] bg-[#F89821] rounded-md text-base text-white ml-[20px]"
        >
          {capitalize(state)}
        </button>
        {state === 'end meeting' && (
          <div className="ml-[18px] inline-flex items-center">
            <div className="w-[14.17px] h-[14.17px]">
              <FiClock />
            </div>
            <div className="mt-[4px] ml-[6px]">
              {durationTimeFormat(duration)}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
