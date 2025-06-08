import { atomWithStorage } from "jotai/utils"

export type User = {
    id: string
    username: string
    email: string
} | null

export const userAtom = atomWithStorage<User>("user", null)
