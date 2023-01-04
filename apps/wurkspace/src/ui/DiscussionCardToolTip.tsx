import { BiPencil } from 'react-icons/bi'
import { RiArrowRightUpLine } from 'react-icons/ri'
import { FiTrash2 } from 'react-icons/fi'
export function ToolTip() {
  return (
    <div>
      <div className="-mt-[14px] ml-[124px] w-[120px] h-8 bg-white grid grid-cols-3 divide-x divide-gray-300 text-[#666666] absolute z-10 rounded-[3px]">
        {/* EDIT BUTTON */}
        <div className="flex items-center justify-center ">
          <BiPencil className="w-[24px] h-[24px] cursor-pointer" />
        </div>
        {/* FORWARD BUTTON */}
        <div className="flex items-center justify-center">
          <RiArrowRightUpLine className="w-[24px] h-[24px] cursor-pointer" />
        </div>
        {/* DELETE BUTTON */}
        <div className="flex items-center justify-center">
          <FiTrash2 className="w-[24px] h-[24px] cursor-pointer" />
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}
