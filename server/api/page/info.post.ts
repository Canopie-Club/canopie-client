export default defineCachedEventHandler(async (event) => {
    const {siteId, path} = await readBody(event)

    const page = await getPageInfo(siteId, path)

    console.log(`Loaded page at ${path}`)

    if (!page) throw createError({
        statusCode: 404,
        statusMessage: "Page not found"
    })

    return page;
}, {
    maxAge: 60,
    name: 'pageInfo'
})