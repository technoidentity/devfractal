import Link from 'next/link'
import Image from 'next/image'
import { useAuth, useSignOut } from '@ui/core/useAuth'

export const MobileMenu = () => {
  const [session] = useAuth()
  const signOut = useSignOut()

  const userImageSrc = session?.user?.image ?? '/user.svg'

  return (
    <div className="">
      <div className=" bg-blue-800 rounded-2lg w-60 h-30 flex flex-col">
        <Link
          href={{
            pathname: '/allActionItems',
          }}
        >
          <a>
            <div className="pt-4 pl-3.5 inline-flex cursor-pointer -ml-px">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h1 className="text-sm font-semibold pl-2.7 pt-px text-white">
                Action Items
              </h1>
            </div>
          </a>
        </Link>

        <Link href="/profile">
          <a>
            <div className="pt-2 pl-3.5  inline-flex cursor-pointer">
              {session && session.user && (
                // @TODO: fix this
                <Image
                  loader={() => userImageSrc}
                  unoptimized
                  src={userImageSrc}
                  alt="profile"
                  width={20}
                  height={20}
                  className="rounded-full cursor-pointer"
                />
              )}
              <h1 className="text-sm font-semibold pl-2.7 pt-px text-white">
                My Profile
              </h1>
            </div>
          </a>
        </Link>
        {/* </div> */}

        <div className="pt-2 pl-4 inline-flex cursor-pointer" onClick={signOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 stroke-white fill-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          <h1 className="text-sm font-semibold pl-2.7 pt-px pb-3 text-white -mt-px">
            Logout
          </h1>
        </div>
      </div>
    </div>
  )
}
