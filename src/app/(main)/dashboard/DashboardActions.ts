"use server"

import { db } from "@/lib/prisma"
import { getSession } from "@/lib/session"

export const getLoggedInWokspace = async (userId: string) => {
    const workspace = await db.workspace.findFirst({
        where: {
            workspaceOwner: userId,
        },
    })
    return workspace // Redirect to the workspace page if found
}
