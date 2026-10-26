import { Rarity, WeatherReport } from "~/generated/prisma/enums"
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
    const weatherField = formData?.find(field => field.name === 'weatherReport');
    const weatherReport = JSON.parse(weatherField?.data.toString() ?? '[]');
    const rarity = formData.find(item => item.name === 'rarity')?.data.toString()
    const url = formData.find(item => item.name === 'url')?.data.toString()
    const description = formData.find(item => item.name === 'description')?.data.toString()
    const tinyDescription = formData.find(item => item.name === 'tinyDescription')?.data.toString()
    const regularDescription = formData.find(item => item.name === 'regularDescription')?.data.toString()
    const hugeDescription = formData.find(item => item.name === 'hugeDescription')?.data.toString()
    const regionId = formData.find(item => item.name === 'regionId')?.data.toString()
    const bait1Id = formData.find(item => item.name === 'bait1Id')?.data.toString()
    const bait2Id = formData.find(item => item.name === 'bait2Id')?.data.toString()

    if (!name || !weatherField || !rarity || !url || !regionId) {
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

    const searchFish = await prisma.fish.findFirst({ where: { id } })

    if (!searchFish) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Poisson non trouvée'
        })
    }


    if (searchFish.name !== searchFish.name) {
        const nameAlreadyExist = await prisma.fish.findUnique({
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
        rarity: rarity as Rarity,
        url,
        description: description ? description : null,
        tinyDescription: tinyDescription ? tinyDescription : null,
        regularDescription: regularDescription ? regularDescription : null,
        hugeDescription: hugeDescription ? hugeDescription : null,
        weatherReport: weatherReport as WeatherReport[],
        regionId: Number(regionId),
        bait1Id: bait1Id ? Number(bait1Id) : null,
        bait2Id: bait2Id ? Number(bait2Id) : null,
        image: searchFish.image
    }

    if (file) {
        await deleteImage(searchFish.image);
        const nameFile = Date.now()
        const image = await uploadImage(file.data, 'helloKitty/fish', nameFile.toString())
        data.image = image.secure_url
    }



    return await prisma.fish.update({
        where: {
            id
        },
        data,
        include: {
            region: true,
            bait1: true,
            bait2: true
        }
    })
})