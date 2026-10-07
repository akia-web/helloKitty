export default defineNuxtRouteMiddleware(async (to) => {
    if (!to.path.startsWith('/admin')) {
        return
    }

    const user = await $fetch('/api/auth/me', {
        headers: useRequestHeaders(['cookie'])
    })

    if (!user || user.role !== 'ADMIN') {
        return navigateTo('/')
    }
})