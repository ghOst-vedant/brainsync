"use server"

import { db } from "@/lib/prisma"
import { getSession } from "@/lib/session"

export const getLoggedInWokspace = async (userId: string) => {
    try {
        const workspace = await db.workspace.findFirst({
            where: {
                workspaceOwner: userId,
            },
        })
        return workspace // Redirect to the workspace page if found
    } catch (error) {
        console.log(error)
        return
    }
}

export const getSubscriptionDetails = async (userId: string) => {
    try {
        const session = await getSession()
        if (!session) {
            throw new Error("User not authenticated")
        }
        const subscription = await db.subscription.findFirst({
            where: {
                userId: userId,
            },
        })
        if (!subscription) {
            throw new Error("No subscription found for the user")
        }
        return subscription
    } catch (error) {
        console.log(error)
        return
    }
}

export const getUserDetails = async (userId: string) => {
    try {
        const user = await db.user.findFirst({
            where: {
                id: userId,
            },
        })
        if (!user) {
            throw new Error("User not found")
        }
        return user
    } catch (error) {
        console.log(error)
        return
    }
}
