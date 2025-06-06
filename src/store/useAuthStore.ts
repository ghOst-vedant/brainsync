import { NamedSet } from "./../../node_modules/zustand/middleware/devtools.d"
import { atomWithStorage } from "jotai/utils"

export type User = {
    id: string
    name: string
    email: string
} | null

export const userAtom = atomWithStorage<User>("user", null)
