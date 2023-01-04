// This component will call only if there is no discussion cards added on any board before the meeting start

import { CgArrowRight } from 'react-icons/cg'

import { Dispatch, SetStateAction } from 'react'

type MeetingState = 'start meeting' | 'end meeting'
interface Props {
  setState: Dispatch<SetStateAction<MeetingState>>
  setStart: Dispatch<SetStateAction<Date | undefined>>
  setIsStartMeetAlertOpen: Dispatch<SetStateAction<boolean>>
  isMeetStart: boolean
  setIsMeetStart: Dispatch<SetStateAction<boolean>>
}
export const StartMeetAlert = (props: Props) => {
  // Here setState is changing meeting button text and setStart is the starting the timer when meeting is start
  const {
    setState,
    setStart,
    setIsStartMeetAlertOpen,
    isMeetStart,
    setIsMeetStart,
  } = props

  return (
    <div>
      <div className="w-[304px] h-[212px] bg-white rounded-[5px] flex">
        <div className="flex flex-col items-center justify-center">
          <h1 className="px-[46px] text-xl text-center text-black">
            Add discussion cards to start the meeting
          </h1>

          <div
            className="w-[100px] h-[35px] bg-[#605BFF] flex items-center justify-center rounded-[5px] my-3.5 text-white cursor-pointer"
            onClick={() => {
              setIsStartMeetAlertOpen(false)
              setIsMeetStart(!isMeetStart)
              setState('end meeting')
              setStart(new Date())
            }}
          >
            <button className="inline-flex items-center">
              OK
              <div className="pl-[5px] flex-1 ">
                <CgArrowRight size={20} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
