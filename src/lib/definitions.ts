import { z } from "zod"
export type SessionPayload = {
    sessionId: string
    userId: string | number
    expiresAt: Date
}
export type FormState =
    | {
          errors?: {
              name?: string[]
              email?: string[]
              password?: string[]
          }
          message?: string
      }
    | undefined
export const CreateWorkspaceFormSchema = z.object({
    workspaceName: z
        .string()
        .describe("Workspace Name")
        .min(1, "Workspace name must be min of 1 character"),
    logo: z.any(),
})
export const CreateWorkspaceDB = CreateWorkspaceFormSchema.extend({
    emoji: z.string(),
    userId: z.string(),
})
