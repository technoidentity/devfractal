import { useClickOutside } from '@ui/core/useClickOutside'
import { ActionCardPopup } from '@ui/popups/ActionCardPopup'
import Image from 'next/image'
import { useState } from 'react'
import { ActionInputPopup } from './ActionInputPopup'
import { AssignActionItems } from './AssignActionItems'

interface Props {
  meetDate: string
}
export const ActionCard = ({ meetDate }: Props) => {
  const [actionText, setActionText] = useState<string>('')
  const [isActionInputBoxPopup, setIsActionInputBoxPopup] =
    useState<boolean>(false)
  const [isAssignCardOpen, setIsAssignCardOpen] = useState(false)
  const [isActionPopup, setIsActionPopup] = useState(false)
  const assignCard = useClickOutside(() => {
    setIsAssignCardOpen(false)
  })

  // to close the popup when user clicks outside
  const inputPopup = useClickOutside(() => {
    if (actionText === '/') {
      setActionText('')
    }
    setIsActionInputBoxPopup(false)
  })

  const handleKeyPress = (event: { keyCode: number }) => {
    // checking if the user click on forward slash or not. if so, display DiscussionInputPopup
    if (event.keyCode === 191 && actionText === '') {
      setIsActionInputBoxPopup(true)
    }
  }

  return (
    <>
      {/* Popup dialog modal when we click on action button */}
      {isActionPopup && (
        <div className="bg-gray-800 fixed bg-opacity-50 inset-0 flex justify-center items-center z-10">
          <ActionCardPopup
            setIsActionPopup={setIsActionPopup}
            meetDate={meetDate}
          />
        </div>
      )}

      {/* Action card */}
      <div className="relative">
        <div className="inline-flex absolute top-[15px] left-[8px]">
          <div>
            <input
              type="checkbox"
              className="h-4 w-4 bg-gray-100 cursor-pointer"
            />
          </div>
          <div className="pl-[11px] text-sm">
            <input
              type="text"
              value={actionText}
              placeholder="Type “/” to open items list"
              onKeyDown={handleKeyPress}
              onChange={e => setActionText(e.target.value)}
              className="outline-none cursor-pointer bg-[#E1E4F3]"
            />
          </div>
          <div className="pl-[45px] -mt-[2px] ">
            <div
              className="flex flex-col items-center justify-center w-[30px] h-[30px] bg-white rounded-full cursor-pointer"
              onClick={() => setIsAssignCardOpen(true)}
            >
              <Image
                src="/add-user.svg"
                alt="userIcon"
                width={19}
                height={19}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="w-[290px] h-[90px] bg-[#E1E4F3] rounded-[5px] inline-flex pt-[15px] cursor-pointer"
          onClick={() => setIsActionPopup(!isActionPopup)}
        ></div>
        <div ref={assignCard}>{isAssignCardOpen && <AssignActionItems />}</div>
        <div ref={inputPopup}>
          {isActionInputBoxPopup && <ActionInputPopup />}
        </div>
      </div>
    </>
  )
}
