import { Prisma } from "~/generated/prisma/client"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const search = String(query.search ?? '').trim()

    let where: Prisma.CharacterWhereInput | undefined

    if (search) {
        where = {
            name: {
                contains: search,
                mode: 'insensitive'
            }
        }
    }

    return await prisma.character.findMany({
        where,
        include: {
            favoriteGift: true,
            receivedGift: true
        },
        orderBy: {
            name: 'asc'
        }
    })
})