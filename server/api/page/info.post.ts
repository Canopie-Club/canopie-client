import { PrismaClient } from '@canopie-club/prisma-client'
import MarkdownIt from 'markdown-it'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const {siteId, path} = await readBody(event)

    const page = await prisma.page.findFirst({
        where: {
            siteId,
            path
        }
    })

    if (!page) throw createError({
        statusCode: 404,
        statusMessage: "Page not found"
    })

    const md = new MarkdownIt()
    const formattedContent = md.render(page.content)

    return {
        ...page,
        formattedContent
    };
})