import { useClickOutside } from '@ui/core/useClickOutside'
import { useProfile } from '@ui/queries'
import Image from 'next/image'
import { useState } from 'react'
import { AllActions } from './AllActions'
import { ProfilePopup } from './ProfilePopup'

export const SideBar = () => {
  const { profile } = useProfile()

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  const [showProfilePopup, setShowProfilePopup] = useState(false)

  const sidebarRef = useClickOutside(() => {
    setSidebarIsOpen(false)
  })

  const profileRef = useClickOutside(() => {
    setShowProfilePopup(false)
  })

  const userImageSrc = profile?.photo ?? '/user.svg'

  // checking if profile image is coming from the people.zoho.com
  const peopleUrl = userImageSrc.match(/people.zoho.com/)

  // extract the first letter of the initial and name. For creating the letter image
  const nameLetter = profile?.firstName.charAt(0)
  const initialLetter = profile?.lastName.charAt(0)

  // Image not existing in the zoho. i.e.,  if the user not uploaded profile pic in zoho
  const findProfilePicOnZoho = (photoUrl: string) => {
    let boolVal
    // eslint-disable-next-line no-useless-escape
    const findIdOfImgInURL = photoUrl.match(/\ID=([^$]+)\&/g)
    findIdOfImgInURL?.map(item => {
      if (item.length <= 6) {
        boolVal = true
        return boolVal
      } else {
        boolVal = false
        return boolVal
      }
    })
    return boolVal
  }
  const imgNotExist = findProfilePicOnZoho(userImageSrc)

  return (
    <div style={{ position: 'absolute' }}>
      <div className="relative min-h-screen flex bg-gray-100">
        {/* sidebar */}
        <div className={'bg-blue-800 text-blue-100 w-15'}>
          {/* logo */}
          <div className="px-3 pt-3">
            <a href="" className="text-white ">
              <Image
                src="/wurkspace-logo.svg"
                alt="Logo"
                width={'35'}
                height={'35'}
              />
            </a>
          </div>
          {/* All action items icon (tick) in the wurkspace */}
          <div
            className="px-4 pt-5.5 cursor-pointer"
            onClick={() => setSidebarIsOpen(sidebarIsOpen => !sidebarIsOpen)}
          >
            <Image
              src="/checkmark-circle.svg"
              alt="checkmark-circle.svg"
              width={25}
              height={25}
            />
          </div>
          {/* Profile picture */}
          <div className="absolute bottom-0 px-3 pb-6 cursor-pointer">
            {/* conditionally rendering the profile picture i.e., if src is coming from people.zoho.com display letter picture else display src image */}
            {peopleUrl || imgNotExist ? (
              <div
                className=" w-[37px] h-[37px] relative flex justify-center items-center rounded-full bg-white text-lg font-bold text-blue-700 uppercase"
                onMouseEnter={() =>
                  setShowProfilePopup(showProfilePopup => !showProfilePopup)
                }
                onClick={() => {
                  setShowProfilePopup(true)
                }}
              >
                {initialLetter}
                {nameLetter}
              </div>
            ) : (
              <Image
                loader={() => userImageSrc}
                src={userImageSrc}
                unoptimized
                alt="user.svg"
                width={34.77}
                height={34.77}
                className="rounded-full"
                onMouseEnter={() =>
                  setShowProfilePopup(showProfilePopup => !showProfilePopup)
                }
                onClick={() => {
                  setShowProfilePopup(true)
                }}
              />
            )}
          </div>
        </div>
        {/* conditionally show MyProfilePopup */}
        <div ref={profileRef} className="bottom-0 absolute ml-15 mb-4">
          {showProfilePopup && <ProfilePopup />}
        </div>
        {/* All Action item popup */}
        <div ref={sidebarRef}>{sidebarIsOpen && <AllActions />}</div>
      </div>
    </div>
  )
}
