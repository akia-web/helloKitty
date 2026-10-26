import { deleteImage } from "~~/server/utils/cloudinary"

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))

    const formData = await readMultipartFormData(event)

    if (!formData) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Champs manquants'
        })
    }

    const name = formData.find(item => item.name === 'name')?.data.toString()
    const file = formData.find(item => item.name === 'file')
    const checked = formData.find(item => item.name === 'checked')?.data.toString()

    if (!name) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Champs manquants'
        })
    }

    if (!checked || checked === 'true') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Champs manquants'
        })
    }

    const searchRegion = await prisma.region.findFirst({ where: { id } })

    if (!searchRegion) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Région non trouvée'
        })
    }


    if (searchRegion.name !== searchRegion.name) {
        const nameAlreadyExist = await prisma.region.findUnique({
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
        image: searchRegion.image
    }

    if (file) {
        await deleteImage(searchRegion.image);
        const nameFile = Date.now()
        const image = await uploadImage(file.data, 'helloKitty/regions', nameFile.toString())
        data.image = image.secure_url
    }



    return await prisma.region.update({
        where: {
            id
        },
        data
    })
})