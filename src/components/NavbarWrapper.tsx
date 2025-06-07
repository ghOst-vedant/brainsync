"use client"

import { useEffect, useState } from "react"
import Navbar from "./navbar"
import { getSession } from "@/lib/session"
import { useAtom } from "jotai"
import { userAtom } from "@/store/useAuthStore"

export default function NavbarWrapper() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
    const [user, setUser] = useAtom(userAtom)
    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession()
            setIsLoggedIn(!!session)
        }
        checkSession()
    }, [user])

    if (isLoggedIn === null) return null

    return !isLoggedIn ? <Navbar /> : null
}
