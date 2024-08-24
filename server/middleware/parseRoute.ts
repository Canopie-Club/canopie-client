import { PrismaClient } from '@canopie-club/prisma-client'
import { parseSubdomain } from '../api/utils/parseSubdomain'
import markdownIt from 'markdown-it'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const url = getRequestURL(event)

	// If API Route, ignore.
	if (/^\/?api/.test(url.pathname)) return;


	if (/^\/?login/.test(url.pathname)) return;

    const { subdomain, domain } = parseSubdomain(getRequestURL(event))

	const routeRecord = await prisma.routeRecord.findFirst({
		where: { subdomain, domain },
		include: {
			site: {
				include: {
					pages: {
						select: {
							title: true,
							path: true
						}
					}
				}
			}
		},
	});

	const site = routeRecord?.site;

	if (!site) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Site not found',
		});
	}

	const pages = routeRecord?.site.pages || []

	const page = await prisma.page.findFirst({
		where: {
			siteId: site.id,
			path: url.pathname
		}
	})

	if (!page) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Page Not Found'
		})
	}

	if (site.template === 'spa') {
		const md = new markdownIt()
		const pages = await prisma.page.findMany({
			where: {
				siteId: site.id,
			},
			select: {
				title: true,
				path: true,
				content: true
			}
		})

		let spaContent = '';
		for (const page of pages) {
			const content = md.render(page.content)
			spaContent += `
				<div class="spa-page" data-path="${page.path}" id="${page.path}">
					<h1>${page.title}</h1>
					<div>${content}</div>
				</div>
			`
		}

		event.context.spaContent = spaContent
	}

    event.context.subdomain = subdomain;
    event.context.siteInfo = site;
	event.context.pageInfo = page;
	event.context.menuRoutes = pages;
})