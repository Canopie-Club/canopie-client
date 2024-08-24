export default defineNuxtRouteMiddleware(async (to, from) => {
    const sessionKey = useSessionKey();
    const user = getUser();

    if (to.path !== '/login' && !sessionKey.value) {
        return navigateTo('/login')
    }

    if (!user.value && sessionKey.value) {
        console.log('hello')
        const result = await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
                username: sessionKey.value,
                password: 'nothing'
            }
        })

        if (result.user) user.value = {
            ...result.user,
            createdAt: new Date(result.user.createdAt),
            updatedAt: new Date(result.user.updatedAt)
        }

        console.log(result)
    }

    console.log('Session Key', sessionKey.value)

    if (!sessionKey.value) user.value = null;


    // if (import.meta.server)
    // if (import.meta.client)
})