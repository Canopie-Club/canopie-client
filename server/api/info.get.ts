// import markdownIt from 'markdown-it'

export default defineEventHandler(async (event) => {
	// const url = getRequestURL(event)

	// If API Route, ignore
	// const { subdomain, domain } = parseSubdomain(getRequestURL(event))

	throw createError({
		statusCode: 404,
		statusMessage: 'Page not found'
	})

	// const [routeRecord] = await useDrizzle()
	// 	.select()
	// 	.from(tables.routeRecords)
	// 	.where(
	// 		and(
	// 			eq(tables.routeRecords.subdomain, subdomain),
	// 			eq(tables.routeRecords.domain, domain)
	// 		)
	// 	)
	// 	.limit(1)
	// 	.leftJoin(tables.sites, eq(tables.sites.id, tables.routeRecords.siteId))

	// const site = routeRecord?.sites;

	// if (!site) {
	// 	throw createError({
	// 		statusCode: 404,
	// 		statusMessage: 'Site not found'
	// 	})
	// }

	// const pages = await useDrizzle().select().from(tables.pages).where(eq(tables.pages.siteId, site.id)).all();

	// let spaContent = '';

	// if (site?.template === 'spa') {
	// 	const md = new markdownIt()
	// 	const pages = await useDrizzle()
	// 		.select()
	// 		.from(tables.pages)
	// 		.where(eq(tables.pages.siteId, site.id))
	// 		.all();

	// 	for (const page of pages) {
	// 		const content = md.render(page.content)
	// 		spaContent += `
	// 			<div class="spa-page" data-path="${page.path}" id="${page.path}">
	// 				<h1 class="spa-title">${page.title}</h1>
	// 				<div>${content}</div>
	// 			</div>
	// 		`
	// 	}
	// }

	// return {
	// 	url,
	// 	domain,
	// 	subdomain,
	// 	site,
	// 	spaContent
	// }
})