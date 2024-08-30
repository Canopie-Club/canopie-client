export default defineEventHandler(async (event) => {
    const {siteId, path} = await readBody(event)

    const [page] = await useDrizzle().select().from(tables.pages).where(and(eq(tables.pages.siteId, siteId), eq(tables.pages.path, path)))

    if (!page) throw createError({
        statusCode: 404,
        statusMessage: "Page not found"
    })

    // const md = new MarkdownIt()
    // const formattedContent = md.render(page.content)
    const testNumber = await cacheTest(path)

    return {
        ...page,
        testNumber
    };
})