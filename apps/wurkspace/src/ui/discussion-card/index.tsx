import { useClickOutside } from '@ui/core/useClickOutside'
import { ToolTip } from '@ui/DiscussionCardToolTip'
import { DiscussionCardPopup } from '@ui/popups/DiscussionCardPopup'
import Image from 'next/image'
import { useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { DiscussionInputPopup } from './DiscussionInputPopup'
interface Props {
  meetDate: string
}
export const DiscussionCard = ({ meetDate }: Props) => {
  const [discussionText, setDiscussionText] = useState<string>('')
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false)
  const [isDiscussionPopup, setIsDiscussionPopup] = useState<boolean>(false)
  const [isDiscussionInputBoxPopup, setIsDiscussionInputBoxPopup] =
    useState<boolean>(false)
  const tooltip = useClickOutside(() => {
    setIsTooltipOpen(false)
  })

  // to close the popup when user clicks outside
  const inputPopup = useClickOutside(() => {
    if (discussionText === '/') {
      setDiscussionText('')
    }
    setIsDiscussionInputBoxPopup(false)
  })

  const handleKeyPress = (event: { keyCode: number }) => {
    // checking if the user click on forward slash or not. if so, display DiscussionInputPopup
    if (event.keyCode === 191 && discussionText === '') {
      setIsDiscussionInputBoxPopup(true)
    }
  }

  return (
    <>
      {/* Popup dialog modal when we click on discussion button */}
      {isDiscussionPopup && (
        <div className="bg-gray-800 fixed bg-opacity-50 inset-0 flex justify-center items-center z-10">
          <DiscussionCardPopup
            setIsDiscussionPopup={setIsDiscussionPopup}
            meetDate={meetDate}
          />
        </div>
      )}
      {/* the following code is, not to respond when the user clicks on the card for discussion popup */}
      {/* check box and input box for the card below */}
      <div>
        <div className="relative">
          <div className="inline-flex absolute top-[13px] left-[8px]">
            <div>
              <input
                type="checkbox"
                className="h-4 w-4 bg-gray-100 cursor-pointer"
              />
            </div>
            <div className="pl-[11px] text-sm">
              <input
                type="text"
                value={discussionText}
                placeholder="Type “/” to open items list"
                onKeyDown={handleKeyPress}
                onChange={e => setDiscussionText(e.target.value)}
                className="outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>
        {/* Display three dots on the on the card */}
        <div className="relative ">
          <div className="absolute top-[10px] right-3 flex flex-col justify-center items-center">
            <div>
              <Image
                src="/manager-pic.svg"
                alt="userIcon"
                width={37}
                height={37}
                className="rounded-full cursor-pointer"
              />
            </div>
            <div className="mt-1" onClick={() => setIsTooltipOpen(true)}>
              <HiOutlineDotsHorizontal className="w-6 h-6 text-[#9A9AA9] cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          className="w-[290px] h-[90px] bg-white rounded-[5px] inline-flex pt-[15px] cursor-pointer"
          onClick={() => setIsDiscussionPopup(!isDiscussionPopup)}
        ></div>

        {/* We Need to display following tooltip(It contains EDIT, DELETE AND FORWARD BUTTONS) once the data is enter in the textbox before that we don't need to display. */}
        <div ref={tooltip} className="shadow-2xl">
          {isTooltipOpen && <ToolTip />}
        </div>
        <div ref={inputPopup}>
          {isDiscussionInputBoxPopup && <DiscussionInputPopup />}
        </div>
      </div>
    </>
  )
}
