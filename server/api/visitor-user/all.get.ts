import { Prisma } from "~/generated/prisma/client"


export default defineEventHandler(async (event) => {
    const user = await getUserFromSession(event)

    const query = getQuery(event)

    const search = String(query.search ?? '').trim()

    if (!user) {
        throw new Error('utilisateur non trouvé')
    }

    return await prisma.visitorUser.findMany({
        where: {
            userId: user.id,
            visitor: {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            }
        },
        include: {
            visitor: {
                include: {
                    character: true,
                    gift: true
                }
            }
        },
        orderBy: [
            {
                isFav: 'desc'
            },
            {
                visitor: {
                    character: {
                        name: 'asc'
                    }
                }
            },
            {
                visitor: {
                    name: 'asc'
                }
            }
        ]
    })
})