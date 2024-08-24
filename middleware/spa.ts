export default defineNuxtRouteMiddleware((to, from) => {
    // const site = useSiteInfo()

    console.log(to.path)
    // if (site.value?.template === 'spa') {
    //     console.log(to.path)
    //     // return navigateTo(`/#${to.path}`)
    // }
})