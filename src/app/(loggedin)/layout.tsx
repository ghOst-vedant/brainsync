import { AppSidebar } from "@/components/Custom-Slidebar/AppSidebar"
import { CustomTriggerOutside } from "@/components/Custom-Slidebar/CustomTrigger"
import { SidebarProvider } from "@/components/ui/sidebar"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
export default async function LoggedInLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await getSession()
    if (!session) {
        redirect("/login")
    }
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <div className="md:hidden top-5 z-50  px-4 py-2 ">
                <CustomTriggerOutside />
            </div>
            <div className="flex m-auto min-h-screen p-8 pb-20 gap-16">
                {children}
            </div>
        </SidebarProvider>
    )
}
