import { Prisma } from "~/generated/prisma/client"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const search = String(query.search ?? '').trim()

    let where: Prisma.VisitorWhereInput | undefined

    if (search) {
        where = {
            name: {
                contains: search,
                mode: 'insensitive'
            }
        }
    }

    return await prisma.visitor.findMany({
        where,
        include: {
            gift: true,
            character: true
        },
        orderBy: [
            {
                character: {
                    name: 'asc'
                }
            },
            {
                name: 'asc'
            }
        ]
    })
})