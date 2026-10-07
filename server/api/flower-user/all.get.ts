import { Prisma } from "~/generated/prisma/client"


export default defineEventHandler(async (event) => {
    const user = await getUserFromSession(event)

    const query = getQuery(event)

    const search = String(query.search ?? '').trim()

    if (!user) {
        throw new Error('utilisateur non trouvé')
    }

    const flowers = await prisma.flowerUser.findMany({
        where: {
            userId: user.id,
            flower: {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            }
        },
        include: {
            flower: {
                include: {
                    defaultColors: true,
                }
            },
            colors: {
                include: {
                    color1: true,
                    color2: true
                },
                orderBy: [
                    {
                        motif: 'asc'
                    }
                ]
            }
        },
        orderBy: [
            {
                flower: {
                    name: 'asc'
                }
            },
        ]
    })

    for (const flower of flowers) {
        flower.colors.sort((a, b) => {
            if (a.motif === 'NONE' && b.motif !== 'NONE') return -1
            if (a.motif !== 'NONE' && b.motif === 'NONE') return 1

            return a.motif.localeCompare(b.motif)
        })
    }

    return flowers
})