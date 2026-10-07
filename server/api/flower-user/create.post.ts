import { uploadImage } from '~~/server/utils/cloudinary'

export default defineEventHandler(async (event) => {
    const user = await getUserFromSession(event)

    if (!user) {
        throw new Error('Utilisateur non trouvé')
    }

    const body = await readBody(event)

    if (!body.flowers) {
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

    const flowers = body.flowers as { id: number }[]

    const flowerIds = flowers.map(flower => flower.id)

    await prisma.$transaction(async (tx) => {
        const existingVisitorUsers = await tx.flowerUser.findMany({
            where: {
                userId: user.id
            }
        })

        const existingFlowerIds = existingVisitorUsers.map(
            flowerUser => flowerUser.flowerId
        )

        const newFlowerIds = flowerIds.filter(
            flowerId => !existingFlowerIds.includes(flowerId)
        )

        if (newFlowerIds.length > 0) {
            await tx.flowerUser.createMany({
                data: newFlowerIds.map(flowerId => ({
                    userId: user.id,
                    flowerId,
                }))
            })
        }

        const flowerIdsToDelete = existingFlowerIds.filter(
            flowerId => !flowerIds.includes(flowerId)
        )

        if (flowerIdsToDelete.length > 0) {
            await tx.flowerUser.deleteMany({
                where: {
                    userId: user.id,
                    flowerId: {
                        in: flowerIdsToDelete
                    }
                }
            })
        }
    })



    return {
        success: true
    }
})