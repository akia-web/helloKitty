import prisma from "~~/server/utils/prisma";
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    if (!user) {
        throw createError({
            statusCode: 401,
            message: 'Email ou mot de passe incorrect'
        })
    }

    const passwordValid = await bcrypt.compare(body.password, user.password)

    if (!passwordValid) {
        throw createError({
            statusCode: 401,
            message: 'Email ou mot de passe incorrect'
        })
    }

    await prisma.session.deleteMany({
        where: {
            userId: user.id
        }
    })

    const session = await prisma.session.create({
        data: {
            userId: user.id,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
        }
    })

    setCookie(event, 'session-hello-kitty', session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7
    })

    return {
        id: user.id,
        email: user.email,
        role: user.role
    }
})