"use server"

import { CreateWorkspaceDB } from "@/lib/definitions"
import { db } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { z } from "zod"

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
            return { data: null, error: null }
        }
        return { data: subscription, error: null }
    } catch (error) {
        console.log("Error fetching subscription: ", error)

        return { data: null, error: error }
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

export const createWorkspace = async (
    values: z.infer<typeof CreateWorkspaceDB>
) => {
    try {
        const { workspaceName, emoji, logo, userId } = values
        const session = await getSession()
        if (!session) {
            throw new Error("User not authenticated")
        }
        const workspace = await db.workspace.create({
            data: {
                title: workspaceName,
                iconId: emoji,
                logo,
                workspaceOwner: userId,
            },
        })
        return { data: workspace, error: null }
    } catch (error) {
        console.log("Error creating workspace: ", error)
        return { data: null, error: error }
    }
}

