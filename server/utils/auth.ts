import prisma from '~~/server/utils/prisma'

export async function getUserFromSession(event: any) {
    const sessionId = getCookie(event, 'session-hello-kitty')

    if (!sessionId) {
        return null
    }

    const session = await prisma.session.findUnique({
        where: {
            id: sessionId
        },
        include: {
            user: true
        }
    })

    if (!session) {
        return null
    }

    if (session.expiresAt < new Date()) {
        await prisma.session.delete({
            where: {
                id: session.id
            }
        })

        return null
    }

    return {
        id: session.user.id,
        email: session.user.email,
        role: session.user.role
    }
}