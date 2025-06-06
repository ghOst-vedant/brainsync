import { signUpSchema } from "@/lib/zod"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { db } from "@/lib/prisma"
export async function POST(req: NextRequest) {
    try {
        const formdata = await req.formData()
        const username = formdata.get("username")
        const email = formdata.get("email")
        const password = formdata.get("confirmPassword")
        const data = { username, email, password }
        const parsed = signUpSchema.safeParse(data)
        if (!parsed.success) {
            return NextResponse.json({ errors: parsed.error }, { status: 400 })
        }
        const signInUser = await db.user.findUnique({
            where: { email: parsed.data.email },
        })

        if (signInUser) {
            return NextResponse.json(
                { message: "User already exists." },
                { status: 409 }
            )
        }
        const hashedPassword = await bcrypt.hash(parsed.data.password, 10)

        const newuser = await db.user.create({
            data: {
                username: parsed.data.username,
                email: parsed.data.email,
                password: hashedPassword,
            },
        })
        return NextResponse.json(
            { message: "User created successfully.", user: newuser },
            { status: 201 }
        )
    } catch (error) {
        console.log("Signup error", error)
        return NextResponse.json(
            { message: "An error occurred during signup." },
            { status: 500 }
        )
    }
}
