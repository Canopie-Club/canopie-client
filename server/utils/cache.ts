export const nonCachedNumber = () => {
    return Math.floor(Math.random() * 100);
}

export const cacheTest = defineCachedFunction(async (path: string) => {
    const randomNumber = nonCachedNumber();
    console.log(`Caching ${randomNumber} for ${path}`);
    return randomNumber;
}, {
    maxAge: 60, // 1 minute
    name: 'cacheTest',
    getKey: (path: string) => path
})

export const getPageInfo = defineCachedFunction(async (siteId: string, path: string) => {
    const [page] = await useDrizzle().select().from(tables.pages).where(and(eq(tables.pages.siteId, siteId), eq(tables.pages.path, path)))
    if (!page) return null

    const testNumber = nonCachedNumber()
    return {
        ...page,
        testNumber
    }
}, {
    maxAge: 60, // 1 minute
    name: 'getPageInfo',
    getKey: (siteId: string, path: string) => `${siteId}-${path}`
})

