"use client"
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react"
import React from "react"
import { useSidebar } from "../ui/sidebar"

export const CustomTriggerInside = () => {
    const { setOpen, setOpenMobile } = useSidebar()
    const handleClick = () => {
        setOpen(false)
        setOpenMobile(false)
    }
    return (
        <div className="absolute top-5 right-5  cursor-pointer p-2 hover:bg-black  rounded-md transition-all duration-200 ease-in-out z-50">
            <PanelLeftClose onClick={handleClick} className="hidden md:block" />
            <X className="md:hidden" onClick={handleClick} />
        </div>
    )
}

export const CustomTriggerOutside = () => {
    const { setOpen, setOpenMobile } = useSidebar()
    return (
        <div className="absolute cursor-pointer p-2 hover:bg-black rounded-md transition-all duration-200 ease-in-out ">
            <PanelLeftOpen
                onClick={() => {
                    setOpen(true)
                    setOpenMobile(true)
                }}
            />
        </div>
    )
}
