import { HiPlus, HiHashtag } from 'react-icons/hi'
import { FiAtSign } from 'react-icons/fi'
export function ActionInputPopup() {
  return (
    <>
      <div className="m-3">
        <div className="w-[238px] h-[131px] bg-white rounded-[5px] shadow-2xl flex flex-col px-[20px] cursor-pointer absolute -mt-[64px] ml-[20px] border-[1px] border-gray-200">
          <div className="inline-flex justify-between items-center pt-[15px] ">
            <div className="text-sm font-medium">Add due date</div>
            <div className="w-[28px] h-[28px] text-[#605BFF] bg-[#F1F1F1] rounded-full flex justify-center items-center cursor-pointer">
              {/* Here we need to display AMPERSAND ICON but i didn't find it in react-icons */}
              <HiPlus />
            </div>
          </div>
          <div className="inline-flex justify-between items-center pt-[9px]">
            <div className="text-sm font-medium">Mention Someone</div>
            <div className="w-[28px] h-[28px] text-[#605BFF] bg-[#F1F1F1] rounded-full flex justify-center items-center cursor-pointer">
              <FiAtSign className="h-[16px]" />
            </div>
          </div>
          <div className="inline-flex justify-between items-center pt-[9px]">
            <div className="text-sm font-medium">Insert Link</div>
            <div className="w-[28px] h-[28px] text-[#605BFF] bg-[#F1F1F1] rounded-full flex justify-center items-center cursor-pointer">
              <HiHashtag className="h-[16px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
