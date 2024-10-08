import type { RouterConfig } from '@nuxt/schema'

export default {
    // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
    // routes: (_routes) => {

    //     const { ssrContext } = useNuxtApp()
    //     const subdomain = useSubdomain()
    //     if (ssrContext?.event.context.subdomain) subdomain.value = ssrContext?.event.context.subdomain
    // },
    routes: (_routes) => {
        const { ssrContext } = useNuxtApp()
        const subdomain = useSubdomain()
        const siteInfo = useSiteInfo()
        const pageInfo = usePageInfo()
        const menuRoutes = useMenuRoutes()
        const spaContent = useSpaContent()

        if (ssrContext?.event.context.subdomain) subdomain.value = ssrContext?.event.context.subdomain
        if (ssrContext?.event.context.siteInfo) siteInfo.value = ssrContext?.event.context.siteInfo
        if (ssrContext?.event.context.pageInfo) pageInfo.value = ssrContext?.event.context.pageInfo
        if (ssrContext?.event.context.menuRoutes) menuRoutes.value = ssrContext?.event.context.menuRoutes
        if (ssrContext?.event.context.spaContent) spaContent.value = ssrContext?.event.context.spaContent

        const template = siteInfo.value?.template || 'default'

        if (subdomain.value) {
            const userRoute = _routes.filter((i) => i.path.includes("/user/:siteId"))

            // if (template === 'spa') {
            //     const userRouteMapped = userRoute.map((i) => ({
            //         ...i,
            //         path: i.path === `/user/:siteId()/${template}` ? i.path.replace(`/user/:siteId()/${template}`, "/") : i.path.replace(`/user/:siteId()/${template}/`, "/#/"),
            //     }))

            //     console.log(userRouteMapped)

            //     return userRouteMapped
            // }
            
            const userRouteMapped = userRoute.map((i) => {
                // replace /user/:siteId()/${template} OR /user/:siteId()/${template}/ with /
                const newPath = i.path.replace(new RegExp(`\/user\/\:siteId\\(\\)\/${template}\/?`), "/")
                if (template === 'spa') {
                    console.log(newPath)
                }
                return {
                ...i,
                path: newPath,
            }})

            // console.log(userRouteMapped)

            return userRouteMapped
        }
        return _routes
    },
} satisfies RouterConfig