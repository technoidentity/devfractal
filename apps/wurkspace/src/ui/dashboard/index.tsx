import { ManagerProfile } from '@ui/manager-profile/ManagerProfile'
import Image from 'next/image'
import { PendingActions } from './ActionItem'
import { GreetingHeader } from './GreetingHeader'
import { PreviousMeets } from './PreviousMeets'
import { UpcomingMeet } from './UpcomingMeet'

export const Dashboard = () => (
  <div className="bg-gray-200  min-h-screen relative lg:flex sm:flex flex flex-col">
    <div>
      <div className="lg:flex-1 sm:flex-1 lg:ml-24 sm:ml-24 sm:mr-8 lg:flex-col sm:flex-col lg:mt-4 sm:mt-4 mt-12 lg:p-0 sm:p-0 p-3">
        <GreetingHeader />
        <div className="lg:flex sm:flex lg:justify-start sm:justify-start pt-2 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 lg:my-4 sm:my-4 lg:z-10 sm:z-10">
            <div>
              <UpcomingMeet />
            </div>
            <div>
              <PreviousMeets />
            </div>
            <div>
              <PendingActions />
            </div>
            <div className="row-span-2 z-10">{/* <Goals /> */}</div>
            <div>
              <ManagerProfile />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 right-0 opacity-0 sm:opacity-50 lg:opacity-100">
      <Image
        src="/BG-Meet-Artboard.svg"
        alt="Meet ArtBoard"
        width={427}
        height={390}
      />
    </div>
  </div>
)

// export async function getServerSideProps() {
//   const session = await getAuth()

//   const scheduledMeetings = getScheduledMeetings({
//     email: session?.user?.email,
//   })
//   const previousMeetings = getCompletedMeetings({ email: session?.user?.email })
//   const pendingActions = getPendingActions({})
// }
