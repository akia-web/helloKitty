import { DefaultColor } from '~/generated/prisma/client'
import { Motif } from '~/generated/prisma/enums'
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
    const defaultColors = formData.find(item => item.name === 'defaultColors')?.data.toString()
    const defaultMotif = formData.find(item => item.name === 'defaultMotif')?.data.toString()



    if (!name || !file || !defaultColors || !defaultMotif) {
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

    const searchFlower = await prisma.flower.findUnique({
        where: {
            name
        }
    })

    if (searchFlower) {
        return {
            success: false,
            message: 'Fleure déjà existante'
        }
    }

    const nameFile = Date.now()
    const image = await uploadImage(file.data, 'helloKitty/flowers', nameFile.toString())
    const colors: DefaultColor[] = JSON.parse(defaultColors)

    const flower = await prisma.flower.create({
        data: {
            name,
            image: image.secure_url,
            defaultMotif: defaultMotif as Motif,
            defaultColors: {
                connect: colors.map(color => ({
                    id: color.id
                }))
            }
        },
        include: {
            defaultColors: true
        }
    })

    return flower
})