// utilities
import { useClickOutside } from '@ui/core/useClickOutside'
import { DiscussionCardPopup } from '@ui/popups/DiscussionCardPopup'
import Image from 'next/image'
import { useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
// components
import { ToolTip } from './DiscussionCardToolTip'
interface Props {
  meetDate: string
}
export function ForwardedDiscussionCard({ meetDate }: Props) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const [isDiscussionPopup, setIsDiscussionPopup] = useState(false)
  const tooltip = useClickOutside(() => {
    setIsTooltipOpen(false)
  })

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
                placeholder="Type “/” to open items list"
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
            <div onClick={() => setIsTooltipOpen(true)} className="mt-1">
              <HiOutlineDotsHorizontal className="w-6 h-6 text-[#9A9AA9] cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* plain discussion card */}
      <div className="">
        <div
          className="w-[290px] h-[90px] bg-white rounded-[5px] inline-flex pt-[15px] cursor-pointer border-[1px] border-[#605BFF]"
          onClick={() => setIsDiscussionPopup(!isDiscussionPopup)}
        ></div>

        {/* forward tag on left bottom of the card */}
        <div className=" bg-[#605BFF] -mt-[26.9px] absolute rounded-bl-[5px] rounded-tr-[5px]">
          <h1 className="text-white text-xs font-thin px-[6px] py-[2px]">
            Forwarded
          </h1>
        </div>

        {/* We Need to display following tooltip( contains EDIT, FORWARD AND DELETE BUTTONS) once the data in the discussion card, before that we don't need to display */}
        <div ref={tooltip} className="shadow-2xl">
          {isTooltipOpen && <ToolTip />}
        </div>
      </div>
    </>
  )
}
