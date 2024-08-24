import type { Page } from '@canopie-club/prisma-client'
import type { PageRoute, SiteWithPagePaths } from "~~/utils/site"
import type { Profiles } from "~~/utils/types"

export const useSubdomain = () => useState<string | null>("subdomain", () => null)
export const useSubdomainProfile = () => useState<Profiles | null>("subdomain-profile", () => null)
export const useSiteInfo = () => useState<SiteWithPagePaths | null>("site-info", () => null)
export const usePageInfo = () => useState<Page | null>("page-info", () => null)
export const useMenuRoutes = () => useState<PageRoute[]>("menu-routes", () => [])
export const useSpaContent = () => useState<string | null>("spa-content", () => null)