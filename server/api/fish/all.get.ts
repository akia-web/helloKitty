import { Prisma } from "~/generated/prisma/client"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const search = String(query.search ?? '').trim()

    return await prisma.fish.findMany({
        where: {
            name: {
                contains: search,
                mode: 'insensitive'
            }
        },
        include: {
            region: true,
            bait1: true,
            bait2: true
        },
        orderBy: {
            name: 'asc'
        }
    })
})