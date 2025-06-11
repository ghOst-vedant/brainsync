import { getSession } from "@/lib/session"
import {
    getLoggedInWokspace,
    getSubscriptionDetails,
    getUserDetails,
} from "../../../../prisma/queries"
import { redirect } from "next/navigation"
import DashboardSetup from "@/components/dashboard-setup/dashboard-setup"

export default async function DashboardPage() {
    const session = await getSession()
    if (!session) return null

    const workspace = await getLoggedInWokspace(session.userId as string)
    const user = await getUserDetails(session.userId as string)
    const { data: subscription, error: subsError } =
        await getSubscriptionDetails(session.userId as string)

    if (!user || subsError) return

    if (!workspace) {
        return (
            <div className="bg-background w-full m-auto flex justify-center items-center">
                <DashboardSetup user={user} subscription={subscription} />
            </div>
        )
    }

    redirect(`/dashboard/${workspace.id}`)
}
