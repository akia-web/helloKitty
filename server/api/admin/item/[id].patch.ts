import { deleteImage } from "~~/server/utils/cloudinary"

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
    const file = formData.find(item => item.name === 'file')
    const checked = formData.find(item => item.name === 'checked')?.data.toString()

    if (!name) {
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

    const searchItem = await prisma.item.findFirst({ where: { id } })

    if (!searchItem) {
        throw new Error('Item non trouvé')
    }


    if (searchItem.name !== searchItem.name) {
        const nameAlreadyExist = await prisma.item.findUnique({
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
        image: searchItem.image
    }

    if (file) {
        await deleteImage(searchItem.image);
        const nameFile = Date.now()
        const image = await uploadImage(file.data, 'helloKitty/items', nameFile.toString())
        data.image = image.secure_url
    }



    const item = await prisma.item.update({
        where: {
            id
        },
        data
    })

    return item
})