"use server"

import { db } from "@/lib/prisma"
import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"
import { SessionPayload } from "./definitions"

const key = new TextEncoder().encode(process.env.JWT_SECRET)

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1day")
        .sign(key)
}

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ["HS256"],
        })
        return payload
    } catch (error) {
        console.log("Failed to verify session")
        return null
    }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const data = await db.session.create({
        data: {
            userId,
            expiresAt,
        },
    })
    console.log(data)

    const sessionId = data.id
    const session = await encrypt({ sessionId, userId, expiresAt })
    const cookiestore = await cookies()
    cookiestore.set("session", session, {
        name: "session",
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        path: "/",
        sameSite: "lax",
    })
}

export async function verifySession() {
    const cookie = (await cookies()).get("session")?.value
    const session = await decrypt(cookie)
    if (!session?.sessionId || !session.userId) {
        console.log("Session is invalid or expired")
        redirect("/login")
    }
    return { isAuth: true, userId: session.userId }
}

export async function getSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")?.value
    if (!session) {
        return null
    }
    const payload = await decrypt(session)
    if (!payload) {
        return null
    }
    return payload as SessionPayload
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete("session")
}
