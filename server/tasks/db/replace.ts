import { readFileSync } from "fs";
import type { Data } from '~/assets/types/prisma-data';
import type { BackupData } from '~/assets/types/db';

/**
 * Database Seeding Task for NuxtHub Dev Environment
 * 
 * This task uses Nitro's 'defineTask' function and requires experimental tasks
 * to be enabled in the Nitro config.
 * 
 * To enable, add the following to your Nitro config:
 * 
 * ```js
 * nitro: {
 *   experimental: {
 *     tasks: true
 *   }
 * }
 * ```
 */

export default defineTask({
  meta: {
    name: "db:replace",
    description: "Replace database with backup",
  },
  async run() {
    console.log("Running DB replace task...");

    const dataLocation = process.env.SEED_DATA_LOCATION;

    console.log("Data location:", dataLocation);

    if (!dataLocation) {
      console.error("No data location found in SEED_DATA_LOCATION");
      return {
        result: "error",
        message: "No data location found in SEED_DATA_LOCATION",
      };
    }

    let data = JSON.parse(
      readFileSync(dataLocation, "utf-8")
    ) as Data | BackupData | null;

    if (!data || !('sites' in data)) {
      console.error("No data found in sites.json");
      return {
        result: "error",
        message: "No data found in sites.json",
      };
    }

    // Convert all dates to Date objects
    data = {
      ...data,
      sites: data.sites.map((site) => ({
        ...site,
        createdAt: 'createdAt' in site ? new Date(site.createdAt) : new Date(),
        updatedAt: new Date(),
        active: 'active' in site ? site.active : 1,
      })),
      pages: data.pages.map((page) => ({
        ...page,
        createdAt: 'createdAt' in page ? new Date(page.createdAt) : new Date(),
        updatedAt: new Date(),
      })),
      routeRecords: data.routeRecords.map((routeRecord) => ({
        ...routeRecord,
        createdAt: 'createdAt' in routeRecord ? new Date(routeRecord.createdAt) : new Date(),
        updatedAt: new Date(),
      })),
      users: data.users.map((user) => ({
        ...user,
        createdAt: 'createdAt' in user ? new Date(user.createdAt) : new Date(),
        updatedAt: new Date(),
      })),
      siteUsers: data.siteUsers.map((siteUser) => ({
        ...siteUser,
        createdAt: 'createdAt' in siteUser ? new Date(siteUser.createdAt) : new Date(),
        updatedAt: new Date(),
      })),
      userSessions: data.userSessions.map((userSession) => ({
        ...userSession,
        createdAt: 'createdAt' in userSession ? new Date(userSession.createdAt) : new Date(),
        expiresAt: new Date(userSession.expiresAt),
      })),
    };

    // Delete all existing data
    await useDrizzle().delete(tables.userSessions).returning();
    await useDrizzle().delete(tables.routeRecords).returning();
    await useDrizzle().delete(tables.siteUsers).returning();
    await useDrizzle().delete(tables.users).returning();
    await useDrizzle().delete(tables.userRoles).returning();
    await useDrizzle().delete(tables.pages).returning();
    await useDrizzle().delete(tables.sites).returning();

    // Insert new data
    const sites = await useDrizzle().insert(tables.sites).values(data.sites).returning();
    const pages = await useDrizzle().insert(tables.pages).values(data.pages).returning();
    const routeRecords = await useDrizzle().insert(tables.routeRecords).values(data.routeRecords).returning();
    const users = await useDrizzle().insert(tables.users).values(data.users).returning();
    const siteUsers = await useDrizzle().insert(tables.siteUsers).values(data.siteUsers).returning();
    const userRoles = await useDrizzle().insert(tables.userRoles).values(data.userRoles).returning();
    const userSessions = await useDrizzle().insert(tables.userSessions).values(data.userSessions).returning();

    return {
      result: "success",
      newSites: sites.length,
      newPages: pages.length,
      newRouteRecords: routeRecords.length,
      newUsers: users.length,
      newSiteUsers: siteUsers.length,
      newUserRoles: userRoles.length,
      newUserSessions: userSessions.length,
    };
  },
});
