import { ObtainWith } from '~/generated/prisma/enums'
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
    const level = formData.find(item => item.name === 'level')?.data.toString()
    const favoriteGift = formData.find(item => item.name === 'favoriteGift')?.data.toString()
    const receivedGift = formData.find(item => item.name === 'receivedGift')?.data.toString()
    const bonus1 = formData.find(item => item.name === 'bonus1')?.data.toString()
    const bonus2 = formData.find(item => item.name === 'bonus2')?.data.toString()
    const file = formData.find(item => item.name === 'file')
    const checked = formData.find(item => item.name === 'checked')?.data.toString()
    const miniature = formData.find(item => item.name === 'miniature')
    const obtainWith = formData.find(item => item.name === 'obtainWith')?.data.toString()


    if (!name || !level || !favoriteGift || !bonus1 || !receivedGift || !file || !obtainWith || !miniature) {
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

    const searchCharacter = await prisma.character.findUnique({
        where: {
            name
        }
    })

    if (searchCharacter) {
        return {
            success: false,
            message: 'Personnage déjà existant'
        }
    }
    const nameFile = Date.now()
    const image = await uploadImage(file.data, 'helloKitty/character', nameFile.toString())

    const nameMiniature = Date.now()
    const imageMiniature = await uploadImage(miniature.data, 'helloKitty/miniature', nameMiniature.toString())


    const character = await prisma.character.create({
        data: {
            name,
            level: Number(level),
            favoriteGiftId: Number(favoriteGift),
            receivedGiftId: Number(receivedGift),
            bonus1,
            bonus2: bonus2 ? bonus2 : null,
            image: image.secure_url,
            miniature: imageMiniature.secure_url,
            obtainWith: obtainWith as ObtainWith

        },
        include: {
            favoriteGift: true,
            receivedGift: true
        }
    })

    return character
})