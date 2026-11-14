import { Motif } from '~/generated/prisma/enums'
import { canHaveColor2 } from '~~/server/utils/canHaveColor2'

export default defineEventHandler(async (event) => {
    const user = await getUserFromSession(event)

    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Utilisateur non trouvé'
        })
    }

    const body = await readBody(event)

    if (!body.color1 || !body.flowerUser) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Données manquantes'
        })
    }

    if (body.color2 === undefined && canHaveColor2(body.motif)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Couleur manquantes'
        })
    }

    if (!canHaveColor2(body.motif) && body.color2) {
        body.color2 = undefined
    }

    if (body.checked || body.checked === undefined) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Données manquantes'
        })
    }

    if (!body.motif) {
        body.motif = Motif.NONE
    }

    const searchFlowerUser = await prisma.flowerUser.findFirst({
        where: {
            flowerId: body.flowerUser.flowerId,
            userId: user.id
        }, include: {
            colors: {
                include: {
                    color1: true,
                    color2: true
                }
            }
        },

    })

    if (!searchFlowerUser) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Données manquantes'
        })
    }

    if (searchFlowerUser.colors.some(color =>
        color.color1.id === body.color1.id &&
        color.motif === body.motif &&
        (
            color.color2?.id === body.color2?.id
        )
    )) {

        throw createError({
            statusCode: 409,
            statusMessage: 'Couleur déjà existante pour cette fleur'
        })
    }



    const flower = await prisma.flowerUser.update({
        where: {
            userId_flowerId: {
                userId: user.id,
                flowerId: body.flowerUser.flowerId
            }
        },
        data: {
            colors: {
                create: {
                    color1Id: Number(body.color1.id),
                    color2Id: body.color2 ? Number(body.color2.id) : undefined,
                    motif: body.motif,
                }
            }
        }
    })

    return flower
})

