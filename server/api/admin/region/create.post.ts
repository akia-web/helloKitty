import { uploadImage } from '~~/server/utils/cloudinary'

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event)

    if (!formData) {

        throw createError({
            statusCode: 400,
            statusMessage: 'Données manquantes'
        })

    }

    const name = formData.find(item => item.name === 'name')?.data.toString()
    const file = formData.find(item => item.name === 'file')
    const checked = formData.find(item => item.name === 'checked')?.data.toString()


    if (!name || !file) {
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

    const searchRegion = await prisma.region.findUnique({
        where: {
            name
        }
    })

    if (searchRegion) {
        throw createError({
            statusCode: 409,
            statusMessage: 'Région existante'
        })
    }

    const nameFile = Date.now()
    const image = await uploadImage(file.data, 'helloKitty/regions', nameFile.toString())

    return await prisma.region.create({
        data: {
            name,
            image: image.secure_url
        }
    })
})