import { uploadImage } from '~~/server/utils/cloudinary'

export default defineEventHandler(async (event) => {
    const user = await getUserFromSession(event)

    if (!user) {
        throw new Error('Utilisateur non trouvé')
    }

    const body = await readBody(event)

    if (!body.visitors) {
        return {
            success: false,
            message: 'Champs manquants'
        }
    }

    if (body.checked) {
        return {
            success: false,
            message: 'Erreur'
        }
    }

    const visitors = body.visitors as { id: number }[]

    const visitorIds = visitors.map(visitor => visitor.id)

    await prisma.$transaction(async (tx) => {
        const existingVisitorUsers = await tx.visitorUser.findMany({
            where: {
                userId: user.id
            }
        })

        const existingVisitorIds = existingVisitorUsers.map(
            visitorUser => visitorUser.visitorId
        )

        const newVisitorIds = visitorIds.filter(
            visitorId => !existingVisitorIds.includes(visitorId)
        )

        if (newVisitorIds.length > 0) {
            await tx.visitorUser.createMany({
                data: newVisitorIds.map(visitorId => ({
                    userId: user.id,
                    visitorId,
                    isFav: false,
                    isResident: false
                }))
            })
        }

        const visitorIdsToDelete = existingVisitorIds.filter(
            visitorId => !visitorIds.includes(visitorId)
        )

        if (visitorIdsToDelete.length > 0) {
            await tx.visitorUser.deleteMany({
                where: {
                    userId: user.id,
                    visitorId: {
                        in: visitorIdsToDelete
                    }
                }
            })
        }
    })



    return {
        success: true
    }
})