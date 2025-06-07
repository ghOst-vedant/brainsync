"use client"
import { useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

const page = () => {
    const [isRegistering, setIsRegistering] = useState(false)
    return (
        <div className="flex m-auto items-center justify-center  md:px-8 px-6 pt-8 md:pt-16 pb-20 gap-16  font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] items-center w-full">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold text-center">Welcome</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-center text-lg">
                        {isRegistering
                            ? "Create a new account to get started."
                            : "Please enter your credentials to login."}
                    </p>
                </div>
                {isRegistering ? (
                    <RegisterForm setIsRegistering={setIsRegistering} />
                ) : (
                    <LoginForm />
                )}

                <div className="mt-4 text-center">
                    {isRegistering ? (
                        <p>
                            Already have an account?{" "}
                            <button
                                className="text-blue-500 underline"
                                onClick={() => setIsRegistering(false)}
                            >
                                Login
                            </button>
                        </p>
                    ) : (
                        <p>
                            Don't have an account?{" "}
                            <button
                                className="text-blue-500 underline"
                                onClick={() => setIsRegistering(true)}
                            >
                                Register
                            </button>
                        </p>
                    )}
                </div>
            </main>
        </div>
    )
}

export default page
