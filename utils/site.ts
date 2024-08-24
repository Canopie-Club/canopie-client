import { Prisma } from "@canopie-club/prisma-client"

const siteWithPages = Prisma.validator<Prisma.SiteDefaultArgs>()({
    include: {
        pages: true,
    }
})

const siteWithPagePaths = Prisma.validator<Prisma.SiteDefaultArgs>()({
    include: {
        pages: {
            select: {
                path: true,
            }
        }
    }
})

const pageRoute = Prisma.validator<Prisma.PageDefaultArgs>()({
    select: {
        title: true,
        path: true,
    }
})

export type SiteWithPages = Prisma.SiteGetPayload<typeof siteWithPages>
export type SiteWithPagePaths = Prisma.SiteGetPayload<typeof siteWithPagePaths>
export type PageRoute = Prisma.PageGetPayload<typeof pageRoute>