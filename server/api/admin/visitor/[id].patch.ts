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
    const gift = formData.find(item => item.name === 'gift')?.data.toString()
    const file = formData.find(item => item.name === 'file')
    const checked = formData.find(item => item.name === 'checked')?.data.toString()
    const character = formData.find(item => item.name === 'character')?.data.toString()


    if (!checked || checked === 'true') {
        return {
            success: false,
            message: 'Erreur'
        }
    }

    if (!name || !gift) {
        return {
            success: false,
            message: 'Champs manquants'
        }
    }

    const searchVisitor = await prisma.visitor.findFirst({ where: { id } })

    if (!searchVisitor) {
        throw new Error('Personnage non trouvé')
    }

    if (searchVisitor.name !== searchVisitor.name) {
        const nameAlreadyExist = await prisma.visitor.findUnique({
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
        giftId: Number(gift),
        image: searchVisitor.image,
        characterId: character ? Number(character) : null
    }

    if (file) {
        await deleteImage(searchVisitor.image);
        const nameFile = Date.now()
        const image = await uploadImage(file.data, 'helloKitty/visitor', nameFile.toString())
        data.image = image.secure_url
    }

    const visitor = await prisma.visitor.update({
        where: {
            id
        },
        data,
        include: {
            gift: true,
            character: true
        }
    })

    return visitor
})