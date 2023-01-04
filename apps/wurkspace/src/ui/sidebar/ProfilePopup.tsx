import { useSignOut } from '@ui/core/useAuth'
import Image from 'next/image'
import Link from 'next/link'

export const ProfilePopup = () => {
  const signOut = useSignOut()

  return (
    <div className="">
      <div className=" bg-white rounded-2lg w-50 h-30 flex flex-col">
        <div className="pt-4 pl-3.5 inline-flex cursor-pointer">
          <Image
            src="/person-outline.svg"
            alt="person-outline"
            width={16}
            height={16}
          />
          <Link href="/profile">
            <a>
              <h1 className="text-sm font-semibold pl-2.7 pt-px">My Profile</h1>
            </a>
          </Link>
        </div>
        <div className="pt-4 pl-3.5 inline-flex cursor-pointer">
          <Image src="/copy.svg" alt="copy" width={16} height={16} />
          <h1 className="text-sm font-semibold pl-2.7 pt-px">
            Organization Structure
          </h1>
        </div>
        <div
          className="pt-4 pl-3.5 inline-flex cursor-pointer"
          onClick={signOut}
        >
          <Image src="/log-out.svg" alt="log-out" width={16} height={16} />
          <h1 className="text-sm font-semibold pl-2.7 pt-px">Logout</h1>
        </div>
      </div>
    </div>
  )
}
