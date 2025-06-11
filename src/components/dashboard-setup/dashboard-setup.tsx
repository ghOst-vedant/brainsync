"use client"

import React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card"
import { User } from "@/lib/schema.types"
interface DashboardSetupProps {
    user: User
    subsciption: {} | null
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({
    user,
    subsciption,
}) => {
    return (
        <Card className="w-[800px] sm:h-auto ">
            <CardHeader>
                <CardTitle>Create a workspace to get started</CardTitle>
                <CardDescription>
                    Craft your personal sanctuary for deep work—where your
                    thoughts, notes, and research come to life.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action="">
                    <div className="flex flex-col gap-4 "></div>
                </form>
            </CardContent>
        </Card>
    )
}

export default DashboardSetup
