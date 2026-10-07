import { Prisma } from "~/generated/prisma/client"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const search = String(query.search ?? '').trim()

    return await prisma.item.findMany({
        where: {
            name: {
                contains: search,
                mode: 'insensitive'
            }
        },
        orderBy: {
            name: 'asc'
        }
    })
})