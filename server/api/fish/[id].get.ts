export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))

    if (!id || isNaN(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID invalide'
        })
    }


    return await prisma.fish.findUnique({
        where: {
            id
        },
        include: {
            region: true,
            bait1: true,
            bait2: true
        },
    })
})