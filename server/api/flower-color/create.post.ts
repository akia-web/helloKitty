import { Motif } from '~/generated/prisma/enums'
import { canHaveColor2 } from '~~/server/utils/canHaveColor2'

export default defineEventHandler(async (event) => {
    const user = await getUserFromSession(event)

    if (!user) {
        throw new Error('Utilisateur non trouvé')
    }

    const body = await readBody(event)

    if (!body.color1 || !body.flowerUser) {
        throw new Error('Données manquantes')
    }

    if (body.color2 === undefined && canHaveColor2(body.motif)) {
        throw new Error('Couleur manquante')
    }

    if (!canHaveColor2(body.motif) && body.color2) {
        body.color2 = undefined
    }

    if (body.checked || body.checked === undefined) {
        throw new Error('Erreur')
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

    if (body.motif === Motif.NONE && searchFlowerUser?.colors.some(color => color.color1.id === body.color1.id)) {
        throw new Error('Couleur déjà existante pour cette fleure')
    }

    if (!searchFlowerUser) {
        throw new Error('Vous ne possedez pas la fleure')
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

