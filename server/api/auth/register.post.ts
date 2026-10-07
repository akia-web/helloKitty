import prisma from "~~/server/utils/prisma";
import bcrypt from 'bcrypt'
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (body.checked === undefined || body.checked === true || body.checked === undefined) {
        return {
            success: false,
            message: 'Erreur'
        }
    }

    const searchUser = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })


    if (searchUser) {
        return {
            success: false,
            message: 'Utilisateur déjà existant'
        }
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)

    await prisma.user.create({
        data: {
            email: body.email,
            password: hashedPassword,
            role: 'USER'
        }
    })

    return {
        success: true,
        message: 'Inscription réussi'
    }
})