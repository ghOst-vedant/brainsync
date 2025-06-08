import { signInSchema, signUpSchema } from "@/lib/zod"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { db } from "@/lib/prisma"
import { create } from "domain"
import { createSession } from "@/lib/session"

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const email = formData.get("email")
        const password = formData.get("password")
        const data = { email, password }
        const parsed = signInSchema.safeParse(data)
        if (!parsed.success) {
            return NextResponse.json({ errors: parsed.error }, { status: 400 })
        }
        const user = await db.user.findUnique({
            where: { email: parsed.data.email },
        })
        if (!user) {
            return NextResponse.json(
                { message: "User not found." },
                { status: 404 }
            )
        }
        const isPasswordValid = await bcrypt.compare(
            parsed.data.password,
            user.password
        )
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid password." },
                { status: 401 }
            )
        }
        await createSession(user.id)
        return NextResponse.json(
            {
                message: "Sign-in successful.",
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
            },
            { status: 200 }
        )
    } catch (error) {
        console.log("Sign-in error", error)
        return NextResponse.json(
            { message: "An error occurred during signup." },
            { status: 500 }
        )
    }
}
