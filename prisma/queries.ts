"use server"

import { CreateWorkspaceDB } from "@/lib/definitions"
import { db } from "@/lib/prisma"
import { Folder, Workspace } from "@/lib/schema.types"

import { getSession } from "@/lib/session"
import { error } from "console"
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
                status: "ACTIVE", // Assuming you want to fetch only active subscriptions
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
        return { data: user, error: null }
    } catch (error) {
        return { data: null, error }
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
        const workspace: Workspace = await db.workspace.create({
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

export const getFolders = async (workspaceId: string) => {
    try {
        const folders: Folder[] = await db.folder.findMany({
            where: {
                workspaceId: workspaceId,
            },
            orderBy: {
                createdAt: "desc",
            },
        })
        console.log("Fetched folders: ", folders)

        return { data: folders, error: null }
    } catch (error) {
        return { data: [], error: null }
    }
}

export const getPrivateWorkspaces = async (userId: string) => {
    try {
        const workspaces: Workspace[] = await db.workspace.findMany({
            where: {
                workspaceOwner: userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        })
        const collaboratorGroups = await db.collaborator.findMany({
            where: {
                workspaceId: {
                    in: workspaces.map((w) => w.id),
                },
            },
            select: {
                workspaceId: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        })
        const workspaceIdsWithCollaborators = new Set(
            collaboratorGroups.map((c) => c.workspaceId)
        )
        const privateWorkspaces = workspaces.filter(
            (w) => !workspaceIdsWithCollaborators.has(w.id)
        )
        return { data: privateWorkspaces, error: null }
    } catch (error) {
        return { data: [], error: null }
    }
}

export const getCollaborativeWorkspaces = async (userId: string) => {
    try {
        const collaborations = await db.collaborator.findMany({
            where: {
                userId: userId,
            },
            select: {
                workspaceId: true,
            },
        })
        const workspaceIds = collaborations.map((c) => c.workspaceId)
        const collaborativeWorkspaces: Workspace[] =
            await db.workspace.findMany({
                where: {
                    id: {
                        in: workspaceIds,
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            })
        return { data: collaborativeWorkspaces, error: null }
    } catch (error) {
        return { data: [], error: null }
    }
}

export const getSharedWorkspaces = async (userId: string) => {
    try {
        const ownedWorkspaces = await db.workspace.findMany({
            where: {
                workspaceOwner: userId,
            },
        })
        if (ownedWorkspaces.length === 0) return { data: [], error: null }
        const collaboratorEntries = await db.collaborator.findMany({
            where: {
                workspaceId: {
                    in: ownedWorkspaces.map((w) => w.id),
                },
            },
            select: {
                workspaceId: true,
            },
        })
        const sharedWorkspaceIds = Array.from(
            new Set(collaboratorEntries.map((c) => c.workspaceId))
        )
        const sharedWorkspaces = await db.workspace.findMany({
            where: {
                id: {
                    in: sharedWorkspaceIds,
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        })
        return { data: sharedWorkspaces, error: null }
    } catch (error) {
        return { data: [], error: null }
    }
}
