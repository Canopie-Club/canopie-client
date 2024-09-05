import markdownIt from 'markdown-it'

export default defineEventHandler(async (event) => {
	const url = getRequestURL(event)

	// If API Route, ignore.
	if (/^\/?_/.test(url.pathname)) return;
	if (/^\/?api/.test(url.pathname)) return;
	if (/^\/?_hub/.test(url.pathname)) return;
	if (/^\/?login/.test(url.pathname)) return;
	if (/^\/?_nitro/.test(url.pathname)) return;

	console.log("ROUTE INFO")
	console.log("url", url.href)

	return;

	// const { subdomain, domain } = parseSubdomain(getRequestURL(event))

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

	// console.log("Made request for sites");

	// // console.log("ROUTE INFO")
	// // console.log("url", url.href)
	// // console.log("subdomain", subdomain)
	// // console.log("domain", domain)
	// // console.log("site", site)
	// // console.log("routeRecord", routeRecord)

	// if (!site) {
	// 	throw createError({
	// 		statusCode: 404,
	// 		statusMessage: 'Site not found',
	// 	});
	// }

	// console.log("Site found, requesting pages");

	// const pages = await useDrizzle().select({
	// 	title: tables.pages.title,
	// 	path: tables.pages.path
	// }).from(tables.pages).where(eq(tables.pages.siteId, site.id)).all();

	// const [page] = await useDrizzle().select().from(tables.pages).where(
	// 	and(
	// 		eq(tables.pages.siteId, site.id),
	// 		eq(tables.pages.path, url.pathname)
	// 	)
	// ).limit(1);

	// console.log("Made request for pages");

	// if (!page) {
	// 	throw createError({
	// 		statusCode: 404,
	// 		statusMessage: 'Page Not Found'
	// 	})
	// }

	// console.log("Page found, requesting content");

	// if (site.template === 'spa') {
	// 	const md = new markdownIt()
	// 	const pages = await useDrizzle()
	// 		.select({
	// 			title: tables.pages.title,
	// 			path: tables.pages.path,
	// 			content: tables.pages.content
	// 		}).
	// 		from(tables.pages)
	// 		.where(eq(tables.pages.siteId, site.id));

	// 	let spaContent = '';
	// 	for (const page of pages) {
	// 		const content = md.render(page.content)
	// 		spaContent += `
	// 			<div class="spa-page" data-path="${page.path}" id="${page.path}">
	// 				<h1 class="spa-title">${page.title}</h1>
	// 				<div>${content}</div>
	// 			</div>
	// 		`
	// 	}

	// 	event.context.spaContent = spaContent
	// }

	// console.log("Spa content found");

	// pages.sort((a, b) => a.path.localeCompare(b.path))

	// console.log("Pages sorted");

	// event.context.subdomain = subdomain;
	// event.context.siteInfo = site;
	// event.context.pageInfo = page;
	// event.context.menuRoutes = pages;

	// console.log("Event context set");
})