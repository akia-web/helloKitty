import { uploadImage } from '~~/server/utils/cloudinary'

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event)

    if (!formData) {
        return {
            success: false,
            message: 'Données manquantes'
        }
    }

    const name = formData.find(item => item.name === 'name')?.data.toString()
    const gift = formData.find(item => item.name === 'gift')?.data.toString()
    const file = formData.find(item => item.name === 'file')
    const checked = formData.find(item => item.name === 'checked')?.data.toString()
    const character = formData.find(item => item.name === 'character')?.data.toString()


    if (!name || !gift || !file) {
        return {
            success: false,
            message: 'Champs manquants'
        }
    }

    if (!checked || checked === 'true') {
        return {
            success: false,
            message: 'Erreur'
        }
    }

    const searchVisitor = await prisma.visitor.findUnique({
        where: {
            name
        }
    })

    if (searchVisitor) {
        return {
            success: false,
            message: 'Visiteur déjà existant'
        }
    }

    const nameFile = Date.now()
    const image = await uploadImage(file.data, 'helloKitty/visitor', nameFile.toString())


    const visitor = await prisma.visitor.create({
        data: {
            name,
            giftId: Number(gift),
            image: image.secure_url,
            characterId: character ? Number(character) : null
        },
        include: {
            gift: true,
            character: true
        }
    })

    return visitor
})