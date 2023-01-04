import { ActionCard } from '@ui/action-card'
import { DiscussionCard } from '@ui/discussion-card'
import { NextPage } from 'next'
import { Dispatch, SetStateAction, useState } from 'react'
import { BsFillLightningChargeFill, BsPlusLg } from 'react-icons/bs'

interface Props {
  id: number
  text: string
  bgColor: string
  boardBGColor: string
  isMeetStart: boolean
  meetDate: string
  setIsDiscussionCardExist: Dispatch<SetStateAction<boolean>>
}

export const Board: NextPage<Props> = ({
  text,
  bgColor,
  boardBGColor,
  isMeetStart,
  meetDate,
  setIsDiscussionCardExist,
}) => {
  const [flagArr, setFlagArr] = useState<string[]>([])

  // Function for identify and store which button is clicked i.e., Discussion button or Action button
  const showCards = (headerText: string, buttonText: string) => {
    if (headerText === text) {
      if (buttonText === 'DiscussionButton') {
        setFlagArr([...flagArr, 'DiscussionButton'])
        setIsDiscussionCardExist(true)
      }
      if (buttonText === 'ActionButton') {
        setFlagArr([...flagArr, 'ActionButton'])
      }
    }
  }

  return (
    <div className="lg:w-[308px] ml-px">
      <div
        className="h-[49px] py-3 pl-3 leading-[25px] text-black font-[600]"
        style={{ backgroundColor: `${bgColor}` }}
      >
        {text}
      </div>
      <div className={`min-h-screen bg-gray-${boardBGColor}`}>
        <div className="pt-11 px-2">
          {/* displaying the static discussion cards when user clicks the discussion button(PlusButton) */}
          {/* TODO: when discussion data saved into db the following implementation need to be change */}
          {flagArr.map((item, idx) => {
            return (
              <div key={idx} className="pb-2">
                {item === 'DiscussionButton' && (
                  <DiscussionCard meetDate={meetDate} />
                )}
                {item === 'ActionButton' && <ActionCard meetDate={meetDate} />}
              </div>
            )
          })}
        </div>
        <div className="flex justify-center items-center mt-[3px]">
          <div
            onClick={() => showCards(text, 'DiscussionButton')}
            className="w-[38px] h-[38px] text-white hover:text-blue-500 active:bg-blue-550 active:text-white bg-blue-550 hover:bg-white border-solid border-[1px] hover:border-blue-500 rounded-full flex justify-center items-center cursor-pointer"
          >
            <BsPlusLg />
          </div>
          {isMeetStart && (
            <div
              onClick={() => showCards(text, 'ActionButton')}
              className="w-[38px] h-[38px] ml-[10px] text-white hover:text-blue-500 active:bg-blue-550 active:text-white bg-blue-550 hover:bg-white border-solid border-[1px] hover:border-blue-500 rounded-full flex justify-center items-center cursor-pointer"
            >
              <BsFillLightningChargeFill />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
