import { HiPlus, HiChevronUp, HiHashtag } from 'react-icons/hi'
import { FaPercent, FaDollarSign, FaAsterisk } from 'react-icons/fa'
import { BsExclamationLg } from 'react-icons/bs'
export function DiscussionInputPopup() {
  return (
    <>
      <div className="w-[238px] h-[279px] bg-white rounded-[5px] shadow-2xl flex flex-col px-[20px] cursor-pointer absolute -mt-[64px] ml-[36px] border-[1px] border-gray-200">
        <div className="inline-flex justify-between items-center pt-[15px] ">
          <div className="text-sm font-medium">Add Goal (OKR)</div>
          <div className="w-[28px] h-[28px] text-[#605BFF] bg-[#F1F1F1] rounded-full flex justify-center items-center cursor-pointer">
            <HiPlus />
          </div>
        </div>
        <div className="inline-flex justify-between items-center pt-[9px]">
          <div className="text-sm font-medium">Reward/Feedback</div>
          <div className="w-[28px] h-[28px] text-[#605BFF] bg-[#F1F1F1] rounded-full flex justify-center items-center cursor-pointer">
            <FaPercent className="h-[12px]" />
          </div>
        </div>
        <div className="inline-flex justify-between items-center pt-[9px]">
          <div className="text-sm font-medium">Time Tracker</div>
          <div className="w-[28px] h-[28px] text-[#605BFF] bg-[#F1F1F1] rounded-full flex justify-center items-center cursor-pointer">
            <FaDollarSign className="h-[14px]" />
          </div>
        </div>
        <div className="inline-flex justify-between items-center pt-[9px]">
          <div className="text-sm font-medium">Leave Tracker</div>
          <div className="w-[28px] h-[28px] text-[#605BFF] bg-[#F1F1F1] rounded-full flex justify-center items-center cursor-pointer">
            <BsExclamationLg className="h-[12px]" />
          </div>
        </div>
        <div className="inline-flex justify-between items-center pt-[9px]">
          <div className="text-sm font-medium">LMS</div>
          <div className="w-[28px] h-[28px] text-[#605BFF] bg-[#F1F1F1] rounded-full flex justify-center items-center cursor-pointer">
            <FaAsterisk className="h-[10px]" />
          </div>
        </div>
        <div className="inline-flex justify-between items-center pt-[9px]">
          <div className="text-sm font-medium">Referrals</div>
          <div className="w-[28px] h-[28px] text-[#605BFF] bg-[#F1F1F1] rounded-full flex justify-center items-center cursor-pointer">
            <HiChevronUp />
          </div>
        </div>
        <div className="inline-flex justify-between items-center pt-[9px]">
          <div className="text-sm font-medium">Insert Link</div>
          <div className="w-[28px] h-[28px] text-[#605BFF] bg-[#F1F1F1] rounded-full flex justify-center items-center cursor-pointer ">
            <HiHashtag />
          </div>
        </div>
      </div>
    </>
  )
}
