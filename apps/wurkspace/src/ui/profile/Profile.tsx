import { jstr } from '@srtp/spec'
import { useProfile } from '@ui/queries'
import { Notification } from './Notifications'
import { PersonalInformationTable } from './PersonalInformationTable'

export const Profile = () => {
  const { profile: personalInfo, error } = useProfile()

  if (error) {
    return <pre style={{ color: 'red' }}>{jstr(error)}</pre>
  }

  if (!personalInfo) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-400"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex">
        <div className="w-full font-nunito ">
          <div className="bg-white mb-3 ml-14 mx-1 py-4 pl-4 shadow-lg h-16 ">
            <h1 className="md:text-2xl text-2xl font-bold text-blue-800">
              My Profile
            </h1>
          </div>
          <div className="max-w-full ml-14  sm:px-4 lg:px-4">
            <div className="bg-white w-full shadow-lg rounded-lg p-8">
              <div className="grid grid-cols-1 gap-8">
                <PersonalInformationTable
                  name={`${personalInfo.firstName} ${personalInfo.lastName}`}
                  email={personalInfo.email}
                  phone={personalInfo.mobile}
                  bio={personalInfo.aboutMe}
                  manager={personalInfo.managerFirstName ?? 'Unknown manager'}
                />
                {/* <Hierarchy organizationData={orgData.organizationData} /> */}
                <Notification />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
