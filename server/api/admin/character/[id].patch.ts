import { ObtainWith } from "~/generated/prisma/enums"

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))
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
    const miniature = formData.find(item => item.name === 'miniature')
    const checked = formData.find(item => item.name === 'checked')?.data.toString()
    const obtainWith = formData.find(item => item.name === 'obtainWith')?.data.toString()


    if (!checked || checked === 'true') {
        return {
            success: false,
            message: 'Erreur'
        }
    }

    if (!name || !level || !favoriteGift || !bonus1 || !receivedGift || !obtainWith) {
        return {
            success: false,
            message: 'Champs manquants'
        }
    }

    const searchCharacter = await prisma.character.findFirst({ where: { id } })

    if (!searchCharacter) {
        throw new Error('Personnage non trouvé')
    }

    if (searchCharacter.name !== searchCharacter.name) {
        const nameAlreadyExist = await prisma.character.findUnique({
            where: {
                name
            }
        })

        if (nameAlreadyExist) {
            throw new Error('Nom déjà utilisé')
        }
    }

    const data = {
        name,
        level: Number(level),
        favoriteGiftId: Number(favoriteGift),
        receivedGiftId: Number(receivedGift),
        bonus1,
        bonus2: bonus2 ? bonus2 : null,
        image: searchCharacter.image,
        miniature: searchCharacter.miniature,
        obtainWith: obtainWith as ObtainWith
    }

    if (file) {
        await deleteImage(searchCharacter.image);
        const nameFile = Date.now()
        const image = await uploadImage(file.data, 'helloKitty/character', nameFile.toString())
        data.image = image.secure_url
    }

    if (miniature) {
        if (searchCharacter.miniature) {
            await deleteImage(searchCharacter.miniature);
        }
        const nameFile = Date.now()
        const image = await uploadImage(miniature.data, 'helloKitty/miniature', nameFile.toString())
        data.miniature = image.secure_url
    }

    const character = await prisma.character.update({
        where: {
            id
        },
        data,
        include: {
            favoriteGift: true,
            receivedGift: true
        }
    })

    return character
})