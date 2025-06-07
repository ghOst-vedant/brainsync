"use client"
import {
    Sidebar,
    SidebarRail,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"

import { CustomTriggerInside, CustomTriggerOutside } from "./CustomTrigger"
import { ModeToggle } from "../ui/ModelToggle"

export function AppSidebar() {
    const { state } = useSidebar()
    console.log(state)

    return (
        <div className="relative">
            <Sidebar variant="floating">
                <CustomTriggerInside />
            </Sidebar>
            {state === "collapsed" && (
                <div className="fixed hidden md:flex top-5 left-10 ">
                    {" "}
                    <CustomTriggerOutside />
                </div>
            )}
        </div>
    )
}
