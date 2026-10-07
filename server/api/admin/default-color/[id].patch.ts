import { deleteImage } from "~~/server/utils/cloudinary"

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))

    const body = await readBody(event)

    if (!body.name || !body.color || !body.colorType) {
        return {
            success: false,
            message: 'Champs manquants'
        }
    }

    if (body.checked) {
        return {
            success: false,
            message: 'Erreur'
        }
    }


    const searchFlowerColor = await prisma.flowerColor.findFirst({ where: { id } })

    if (!searchFlowerColor) {
        throw new Error('Couleur non trouvée')
    }


    if (searchFlowerColor.name !== searchFlowerColor.name) {
        const nameAlreadyExist = await prisma.flowerColor.findUnique({
            where: {
                name
            }
        })

        if (nameAlreadyExist) {
            throw new Error('Couleur déjà utilisé')
        }
    }

    const data = {
        name: body.name,
        color: body.color.includes('#') ? body.color : `#${body.color}`,
        colorType: body.colorType
    }



    const flowerColor = await prisma.flowerColor.update({
        where: {
            id
        },
        data
    })

    return flowerColor
})