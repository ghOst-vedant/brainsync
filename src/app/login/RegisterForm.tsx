import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import React, { FormEvent, useState } from "react"

const RegisterForm = ({
    setIsRegistering,
}: {
    setIsRegistering: (value: boolean) => void
}) => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const response = await fetch("/api/v1/auth/signup", {
            method: "POST",
            body: formData,
        })
        const data = await response.json()
        if (response.ok) {
            setIsRegistering(false) // soft navigation to home
        } else {
            setError(data.message || "Login failed")
        }
    }
    return (
        <main className="w-[40%] flex flex-col gap-8 items-center justify-center p-8 border dark:border-gray-700 rounded-xl shadow-lg ">
            <h1 className="text-2xl font-bold text-center">Register</h1>
            <p className="text-gray-600 dark:text-gray-400 text-center text-lg">
                Please enter your details to create an account.
            </p>
            <form
                className="flex flex-col gap-6 w-full"
                action="#"
                onSubmit={handleRegister}
            >
                <div className="flex gap-4">
                    <div className="flex flex-col gap-4 w-full">
                        <label
                            htmlFor="username"
                            className="text-md font-medium"
                        >
                            Username
                        </label>
                        <Input
                            type="username"
                            name="username"
                            autoComplete="username"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <label
                            htmlFor="username"
                            className="text-md font-medium"
                        >
                            Email
                        </label>
                        <Input
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                        />
                    </div>
                </div>
                <div className="flex gap-4 ">
                    <div className="flex flex-col gap-4 w-full">
                        <label
                            htmlFor="password"
                            className="text-md font-medium"
                        >
                            Password
                        </label>
                        <Input
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <label
                            htmlFor="password"
                            className="text-md font-medium"
                        >
                            Confirm Password
                        </label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit">Register</Button>
            </form>
        </main>
    )
}

export default RegisterForm
