import { deleteImage } from "~~/server/utils/cloudinary"

export default defineEventHandler(async (event) => {
    // const user = await getUserFromSession(event)

    // if (!user) {
    //     throw new Error('Utilisateur non trouvé')
    // }

    // const visitorId = Number(getRouterParam(event, 'visitorId'))


    // const body = await readBody(event)

    // if (body.resident === undefined || !body.fav === undefined) {
    //     return {
    //         success: false,
    //         message: 'Champs manquants'
    //     }
    // }

    // const searchVisitorUser = await prisma.visitorUser.findFirst({ where: { userId: user.id, visitorId } })

    // if (!searchVisitorUser) {
    //     throw new Error('Visiteur utilisateur non trouvé')
    // }




    // const visitorUser = await prisma.visitorUser.update({
    //     where: {
    //         userId_visitorId: {
    //             userId: user.id,
    //             visitorId
    //         }
    //     },
    //     data: {
    //         isResident: body.resident ? !searchVisitorUser.isResident : searchVisitorUser.isResident,
    //         isFav: body.fav ? !searchVisitorUser.isFav : searchVisitorUser.isFav
    //     },
    //     include: {
    //         visitor: {
    //             include: {
    //                 character: true,
    //                 gift: true
    //             }
    //         }
    //     }

    // })

    // return visitorUser
})