import { uploadImage } from '~~/server/utils/cloudinary'

export default defineEventHandler(async (event) => {
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

    const searchFlowerColor = await prisma.defaultColor.findUnique({
        where: {
            name: body.name
        }
    })

    if (searchFlowerColor) {
        return {
            success: false,
            message: 'Couleur de fleure déjà existante'
        }
    }

    const flowerColor = await prisma.defaultColor.create({
        data: {
            name: body.name,
            color: body.color.includes('#') ? body.color : `#${body.color}`,
            colorType: body.colorType
        }
    })

    return flowerColor
})