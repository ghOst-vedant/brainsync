import { getSession } from "@/lib/session"
import { getLoggedInWokspace } from "./DashboardActions"
import { redirect } from "next/navigation"
import DashboardSetup from "@/components/dashboard-setup/dashboard-setup"

export default async function DashboardPage() {
    const session = await getSession()
    if (!session) return

    const workspace = await getLoggedInWokspace(session.userId as string)

    if (!workspace)
        return (
            <div className="bg-background w-full m-auto flex justify-center items-center">
                <DashboardSetup></DashboardSetup>
            </div>
        )
    redirect(`/workspace/${workspace.id}`)
}
