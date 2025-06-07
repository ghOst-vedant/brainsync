"use client"

import { Sidebar, useSidebar } from "@/components/ui/sidebar"
import { CustomTriggerInside, CustomTriggerOutside } from "./CustomTrigger"
import AuthButtons from "../AuthButtons"

export function AppSidebar() {
    const { state } = useSidebar()

    return (
        <div className="relative">
            <Sidebar variant="floating">
                <CustomTriggerInside />
                <AuthButtons />
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
