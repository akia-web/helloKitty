import cloudinary from '~~/server/utils/cloudinary'

export default defineEventHandler(async () => {
    const result = await cloudinary.api.resources({
        type: 'upload',
        resource_type: 'image',
        prefix: 'jobs/',
    })

    return result.resources.map((image: any) => ({
        name: image.public_id.split('/').pop(),
        url: image.secure_url
    })).sort((a: { name: string, url: string }, b: { name: string, url: string }) => a.name.localeCompare(b.name))

})