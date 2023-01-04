import Image from 'next/image'
import Link from 'next/link'
import { ErrorMessage, Loading } from '../core'
import { useManagerProfile } from '../queries'

const Error = () => (
  <ErrorMessage error={"can't fetch manager profile"}></ErrorMessage>
)

export const ManagerProfile = () => {
  const { manager, error } = useManagerProfile()

  if (error) {
    console.error(error)
    return <ErrorMessage error="can't fetch manager profile" />
  }

  const userImageSrc = manager?.photo ?? '/user.svg'

  // checking if profile image is coming from the people.zoho.com
  const peopleUrl = userImageSrc.match(/people.zoho.com/)

  // extract the first letter of the initial and name. For creating the letter image
  const nameLetter = manager?.firstName.charAt(0)
  const initialLetter = manager?.lastName.charAt(0)

  // Image not existing in the zoho. i.e., if the user not uploaded profile pic in zoho
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
    <div className="max-w-md font-nunito">
      <div className=" bg-white rounded-2lg py-5 pl-7">
        {error ? (
          <Error />
        ) : !manager ? (
          <Loading />
        ) : (
          <div className="flex">
            {/* conditionally rendering the profile picture i.e., if src is coming from people.zoho.com display letter picture else display src image */}
            {peopleUrl || imgNotExist ? (
              <div className=" w-[70px] h-[70px] relative flex justify-center items-center rounded-full bg-blue-700 text-2xl font-bold text-white uppercase">
                {initialLetter}
                {nameLetter}
              </div>
            ) : (
              <Image
                loader={() => userImageSrc}
                src={userImageSrc}
                unoptimized
                alt="userIcon"
                width={70}
                height={70}
                className="rounded-full"
              />
            )}
            <div className="flex items-center justify-center">
              <div className="flex flex-col pl-6">
                <h1 className="lg:text-2xl sm:text-xl text-xl font-bold">
                  Your Manager
                </h1>

                <div className="text-base font-bold text-blue-600">
                  <Link href="/manager-profile">
                    <a>{manager.firstName}</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
