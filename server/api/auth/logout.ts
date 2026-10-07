import prisma from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const sessionId = getCookie(event, 'session-hello-kitty')

    if (sessionId) {
        await prisma.session.delete({
            where: {
                id: sessionId
            }
        })
    }

    deleteCookie(event, 'session-hello-kitty')

    return {
        success: true
    }
})