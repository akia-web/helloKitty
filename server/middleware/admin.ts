export default defineEventHandler(async (event) => {
    if (!event.path.startsWith('/api/admin')) {
        return
    }

    const user = await getUserFromSession(event)

    if (!user || user.role !== 'ADMIN') {
        throw createError({
            statusCode: 403,
            statusMessage: 'Accès interdit'
        })
    }
})