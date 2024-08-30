import { v4 as uuidv4 } from 'uuid';

export default defineEventHandler(async (event) => {
    const routeInfo = {
        id: uuidv4(),
        subdomain: 'canopie-client',
        domain: 'nuxt.dev',
        siteId: 'ee8e12c8-4d55-488e-b839-65efc4ee1a44',
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const routes = await useDrizzle()
        .select()
        .from(tables.routeRecords)
        .where(
            and(
                eq(tables.routeRecords.subdomain, routeInfo.subdomain),
                eq(tables.routeRecords.domain, routeInfo.domain)
            )
        )
        .limit(1);

    if (routes.length > 0) {
        return routes;
    }
    const newRoute = await useDrizzle().insert(tables.routeRecords).values(routeInfo).returning();
    return newRoute;
})