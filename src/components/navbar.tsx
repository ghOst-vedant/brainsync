"use client"
import React, { useEffect, useState } from "react"
import { ModeToggle } from "./ui/ModelToggle"
import { Button } from "./ui/button"

import { useRouter } from "next/navigation"
import { logout } from "./navBarActions"
import { userAtom } from "@/store/useAuthStore"
import { useAtom } from "jotai"
import { Loader2 } from "lucide-react"
import { useTheme } from "next-themes"

const Navbar = () => {
    const { theme } = useTheme()
    const router = useRouter()
    const [user, setUser] = useAtom(userAtom)
    const [isHydrated, setIsHydrated] = useState(false)
    useEffect(() => {
        setIsHydrated(true)
    }, [])
    // useEffect(() => {
    //     if (!user) {
    //         router.push("/login")
    //     }
    // }, [user])
    const handleLogout = async () => {
        await logout()
        setUser(null)
        router.push("/login")
    }

    return (
        <div>
            <nav className="flex items-center justify-between p-6 shadow-xl ">
                <div className="text-lg font-bold">BrainSync</div>
                <ul className="flex space-x-4 items-center justify-center">
                    <li>
                        <a href="/" className="hover:underline">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/about" className="hover:underline">
                            About
                        </a>
                    </li>
                    <li>
                        {!isHydrated ? (
                            <Button disabled variant="outline">
                                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                Loading
                            </Button>
                        ) : user ? (
                            <Button
                                variant={
                                    theme === "dark" ? "outline" : "default"
                                }
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button
                                asChild
                                variant={
                                    theme === "dark" ? "outline" : "default"
                                }
                            >
                                <a href="/login">Login</a>
                            </Button>
                        )}
                    </li>
                    <li>
                        <ModeToggle />
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
