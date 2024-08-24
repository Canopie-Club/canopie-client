import { PrismaClient } from '@canopie-club/prisma-client'
import MarkdownIt from 'markdown-it'
import { parseSubdomain } from './utils/parseSubdomain'
import markdownIt from 'markdown-it'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const url = getRequestURL(event)

	// If API Route, ignore
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


    let spaContent = '';

	if (site?.template === 'spa') {
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
		for (const page of pages) {
			const content = md.render(page.content)
			spaContent += `
				<div class="spa-page" data-path="${page.path}" id="${page.path}">
					<h1>${page.title}</h1>
					<div>${content}</div>
				</div>
			`
		}
	}
    
    return {
        url,
        domain,
        subdomain,
        site,
        spaContent
    }
})