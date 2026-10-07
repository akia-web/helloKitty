import { Prisma } from "~/generated/prisma/client"


export default defineEventHandler(async (event) => {
    const user = await getUserFromSession(event)

    const query = getQuery(event)

    const search = String(query.search ?? '').trim()

    if (!user) {
        throw new Error('utilisateur non trouvé')
    }

    return await prisma.flowerUser.findMany({
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
})