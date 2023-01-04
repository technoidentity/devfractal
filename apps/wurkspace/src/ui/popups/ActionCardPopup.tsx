// @components
import { useClickOutside } from '@ui/core/useClickOutside'
import { DatePickerView } from '@ui/core'
import { Dispatch, SetStateAction } from 'react'
import { TiArrowRight } from 'react-icons/ti'

interface Props {
  setIsActionPopup: Dispatch<SetStateAction<boolean>>
  meetDate: string
}

export const ActionCardPopup = ({ setIsActionPopup, meetDate }: Props) => {
  const ActionPopup = useClickOutside(() => {
    setIsActionPopup(false)
  })

  return (
    <div>
      <div
        className="w-[577px] h-[300px] bg-white rounded-[5px]"
        ref={ActionPopup}
      >
        <div className="pt-[11px] flex">
          <div className="w-[135px] pl-[17px]">
            <select className="form-select block w-full px-2 py-1.5 text-base font-medium text-[#666666] bg-[#9A9AA91A] border border-solid border-gray-300 rounded transition ease-in-out focus:border-blue-600 focus:outline-none">
              <option value="action">Action</option>
              <option value="discussion">Discussed</option>
              <option value="open" selected>
                Open
              </option>
              <option value="close">Close</option>
            </select>
          </div>
          <div className="flex divide-x divide-solid">
            <div className="mt-[2px] ml-[14px] pr-[20px]">
              <h1 className="text-xs text-[#9A9AA9]">Due on</h1>
              <h1>
                <DatePickerView />
              </h1>
            </div>
            <div className="mt-[2px] pl-[10px] pr-[20px]">
              <h1 className="text-xs text-[#9A9AA9]">Assigned to</h1>
              <h1 className="text-[15px] text-[#605BFF] font-semibold">
                John Doe
              </h1>
            </div>
            <div className="mt-[2px] pl-[10px] pr-[20px]">
              <h1 className="text-xs text-[#9A9AA9]">Added by</h1>
              <h1 className="text-[15px] text-[#605BFF] font-semibold">Emma</h1>
            </div>
            <div className="mt-[2px] pl-[10px]">
              <h1 className="text-xs text-[#9A9AA9]">Added on </h1>
              <h1 className="text-[15px] text-[#605BFF] font-semibold">
                {meetDate}
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full h-[80px] bg-violet-100 mt-[10px]">
          <h1 className="text-base font-semibold tracking-wider py-[18px] pl-[14px] pr-[142px]">
            Approve/assign the XXXXX course in LMS
          </h1>
        </div>
        <div className="mt-[9px] ">
          <h1 className="text-[#333333] text-base font-semibold pl-[14px]">
            Your Progress
          </h1>
          <div className="mx-[14px]">
            <textarea className="resize-none rounded-[5px] w-[545px] h-[78px] mt-[6px] border-[1px] border-[#C4C4C4] focus:outline-none"></textarea>
          </div>
          <div className="relative">
            <div
              className="mx-[18px] w-[29px] h-[29px] bg-[#605BFF] rounded-full flex justify-center items-center absolute right-0 cursor-pointer"
              onClick={() => setIsActionPopup(false)}
            >
              <TiArrowRight className="text-4xl text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
