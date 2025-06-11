// import { getSession } from "@/lib/session"
// import {
//     getLoggedInWokspace,
//     getSubscriptionDetails,
//     getUserDetails,
// } from "./queries"
// import { redirect } from "next/navigation"
// import DashboardSetup from "@/components/dashboard-setup/dashboard-setup"
// export default async function DashboardPage() {
//     const session = await getSession()
//     if (!session) return

//     const workspace = await getLoggedInWokspace(session.userId as string)
//     const user = await getUserDetails(session.userId as string)
//     const subscription = await getSubscriptionDetails(session.userId as string)
//     if (!user) return

//     if (!subscription) return
//     if (!workspace)
//         return (
//             <div className="bg-background w-full m-auto flex justify-center items-center">
//                 <DashboardSetup
//                     user={user}
//                     subscription={subscription}
//                 ></DashboardSetup>
//             </div>
//         )
//     redirect(`/workspace/${workspace.id}`)
// }
import { getSession } from "@/lib/session"
import {
    getLoggedInWokspace,
    getSubscriptionDetails,
    getUserDetails,
} from "./queries"
import { redirect } from "next/navigation"
import DashboardSetup from "@/components/dashboard-setup/dashboard-setup"

export default async function DashboardPage() {
    const session = await getSession()
    if (!session) return null

    const [workspace, user, subscription] = await Promise.all([
        getLoggedInWokspace(session.userId as string),
        getUserDetails(session.userId as string),
        getSubscriptionDetails(session.userId as string),
    ])

    if (!user || !subscription) return null

    if (!workspace) {
        return (
            <div className="bg-background w-full m-auto flex justify-center items-center">
                <DashboardSetup user={user} subscription={subscription} />
            </div>
        )
    }

    redirect(`/workspace/${workspace.id}`)
}
