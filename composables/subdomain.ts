import type { Page } from '~/assets/types/db'
import type { Profiles } from "~~/utils/types"
// import type { PageRoute, SiteWithPagePaths } from "~~/utils/site"

export const useSubdomain = () => useState<string | null>("subdomain", () => null)
export const useSubdomainProfile = () => useState<Profiles | null>("subdomain-profile", () => null)
// TODO: Fix any
export const useSiteInfo = () => useState<any | null>("site-info", () => null)
export const usePageInfo = () => useState<Page | null>("page-info", () => null)
// TODO: Fix any
export const useMenuRoutes = () => useState<any[]>("menu-routes", () => [])
export const useSpaContent = () => useState<string | null>("spa-content", () => null)