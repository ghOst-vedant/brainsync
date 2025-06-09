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
    if (!session) return

    const workspace = await getLoggedInWokspace(session.userId as string)
    const user = await getUserDetails(session.userId as string)
    const subsciption = await getSubscriptionDetails(session.userId as string)
    if (!user) return
    if (!subsciption) return
    if (!workspace)
        return (
            <div className="bg-background w-full m-auto flex justify-center items-center">
                <DashboardSetup
                    user={user}
                    subsciption={subsciption}
                ></DashboardSetup>
            </div>
        )
    redirect(`/workspace/${workspace.id}`)
}
