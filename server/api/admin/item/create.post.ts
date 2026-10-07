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
    const file = formData.find(item => item.name === 'file')
    const checked = formData.find(item => item.name === 'checked')?.data.toString()


    if (!name || !file) {
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

    const searchItem = await prisma.item.findUnique({
        where: {
            name
        }
    })

    if (searchItem) {
        return {
            success: false,
            message: 'Item déjà existant'
        }
    }

    const nameFile = Date.now()
    const image = await uploadImage(file.data, 'helloKitty/items', nameFile.toString())

    const character = await prisma.item.create({
        data: {
            name,
            image: image.secure_url
        }
    })

    return character
})