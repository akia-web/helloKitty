export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))
    const user = await getUserFromSession(event)

    if (!user) {
        throw createError({
            statusCode: 401,
            message: 'Utilisateur non authentifié'
        })
    }

    const result = await prisma.flowerColor.deleteMany({
        where: {
            id,
            flowerUsers: {
                some: {
                    userId: user.id
                }
            }
        }
    })

    if (result.count === 0) {
        throw createError({
            statusCode: 404,
            message: 'Couleur introuvable'
        })
    }

    return {
        message: 'Couleur supprimée'
    }
})