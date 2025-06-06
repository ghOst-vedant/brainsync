"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createSession } from "@/lib/session"
import { userAtom } from "@/store/useAuthStore"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

import { useFormStatus } from "react-dom"

const LoginForm = () => {
    const [, setUser] = useAtom(userAtom)
    const [error, setError] = useState("")
    const router = useRouter()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const response = await fetch("/api/v1/auth/signin", {
            method: "POST",
            body: formData,
        })
        const data = await response.json()

        if (response.ok) {
            setUser(data.user) // <-- store user in Zustand
            router.replace("/") // soft navigation to home
        } else {
            setError(data.message || "Login failed")
        }
    }
    return (
        <main className="w-full max-w-md flex flex-col gap-8 items-center justify-center p-8 border dark:border-gray-700 rounded-xl shadow-lg ">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <p className="text-gray-600 dark:text-gray-400 text-center text-lg">
                Please enter your username and password to login.
            </p>
            <form
                action="#"
                className="flex flex-col gap-6 w-full max-w-md "
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-4">
                    <label htmlFor="username" className="text-md font-medium">
                        Email
                    </label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        className="border dark:border-gray-700 rounded-lg p-2 w-full md:text-lg"
                        required
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="password" className="text-md font-medium">
                        Password
                    </label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        className="border dark:border-gray-700 rounded-lg p-2 w-full md:text-lg"
                        required
                    />
                </div>
                {error && <p className="text-red">{error}</p>}
                <SubmitButton />
            </form>
        </main>
    )
}
function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button disabled={pending} type="submit" className="w-full p-4 text-md">
            Login
        </Button>
    )
}
export default LoginForm
