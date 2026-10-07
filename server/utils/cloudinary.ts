import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import sharp from 'sharp'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export default cloudinary

export const uploadImage = async (
    file: Buffer,
    folder: string,
    publicId: string
): Promise<UploadApiResponse> => {
    return new Promise(async (resolve, reject) => {
        const compressedFile = await sharp(file)
            .resize(1200, 1200, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({
                quality: 80
            })
            .toBuffer()


        cloudinary.uploader
            .upload_stream(
                {
                    folder,
                    public_id: publicId,
                    overwrite: true,
                    resource_type: 'image'
                },
                (error, result) => {
                    if (error || !result) {
                        reject(error)
                        return
                    }

                    resolve(result)
                }
            )
            .end(compressedFile)
    })
}

export const deleteImage = async (
    url: string
): Promise<void> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(
            getPublicIdFromUrl(url),
            {
                resource_type: 'image'
            },
            (error, result) => {
                if (error) {
                    reject(error)
                    return
                }

                if (result?.result !== 'ok') {
                    reject(new Error(`Impossible de supprimer l'image : ${result?.result}`))
                    return
                }

                resolve()
            }
        )
    })
}

export const getPublicIdFromUrl = (url: string): string => {
    const parts = url.split('/upload/')

    if (parts.length !== 2) {
        throw new Error('URL Cloudinary invalide')
    }

    let publicId = parts[1]

    if (publicId) {
        publicId = publicId.replace(/^v\d+\//, '')
        publicId = publicId.replace(/\.[^/.]+$/, '')
        console.log(publicId)
        return publicId

    } else {
        throw new Error('Impossible de recuperer le publicID')
    }



}