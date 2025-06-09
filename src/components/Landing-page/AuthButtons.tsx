"use client"

import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { logout } from "./navBarActions"
import { userAtom } from "@/store/useAuthStore"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import Link from "next/link"

const AuthButtons = () => {
    const router = useRouter()
    const [user, setUser] = useAtom(userAtom)
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    const handleLogout = async () => {
        setUser(null)
        await logout()
        router.refresh()
    }

    useEffect(() => {
        if (isHydrated && user === null) {
            router.push("/login")
        }
    }, [user, isHydrated, router])

    if (!isHydrated) {
        return (
            <Button disabled variant="outline" className="w-full">
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Loading
            </Button>
        )
    }

    return user ? (
        <Button className="w-full" onClick={handleLogout}>
            Logout
        </Button>
    ) : (
        <Button asChild className="w-full">
            <Link href="/login">Login</Link>
        </Button>
    )
}

export default AuthButtons
