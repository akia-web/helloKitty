import { DefaultColor } from "~/generated/prisma/client"
import { Motif } from "~/generated/prisma/enums"
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
    const defaultColors = formData.find(item => item.name === 'defaultColors')?.data.toString()
    const defaultMotif = formData.find(item => item.name === 'defaultMotif')?.data.toString()

    if (!name || !defaultColors || !defaultMotif) {
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

    const searchFlower = await prisma.flower.findFirst({ where: { id } })

    if (!searchFlower) {
        throw new Error('Fleur non trouvé')
    }


    if (searchFlower.name !== name) {
        const nameAlreadyExist = await prisma.flower.findUnique({
            where: {
                name
            }
        })

        if (nameAlreadyExist) {
            throw new Error('Nom déjà utilisé')
        }
    }

    const colors: DefaultColor[] = JSON.parse(defaultColors)
    const data = {
        name,
        image: searchFlower.image,
        defaultMotif: defaultMotif as Motif,
        defaultColors: {
            set: colors.map(color => ({
                id: color.id
            }))
        }
    }

    if (file) {
        await deleteImage(searchFlower.image);
        const nameFile = Date.now()
        const image = await uploadImage(file.data, 'helloKitty/flowers', nameFile.toString())
        data.image = image.secure_url
    }



    const flower = await prisma.flower.update({
        where: {
            id
        },
        data,
        include: {
            defaultColors: true
        }
    })

    return flower
})