import { writeFileSync } from "fs";

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
    name: "db:backup",
    description: "Run database backup task",
  },
  async run() {
    console.log("Running DB backup task...");

    const dataLocation = process.env.BACKUP_DATA_LOCATION;

    console.log("Data location:", dataLocation);

    if (!dataLocation) {
      console.error("No data location found in BACKUP_DATA_LOCATION");
      return {
        result: "error",
        message: "No data location found in BACKUP_DATA_LOCATION",
      };
    }

    const data = {
      sites: await useDrizzle().select().from(tables.sites),
      pages: await useDrizzle().select().from(tables.pages),
      routeRecords: await useDrizzle().select().from(tables.routeRecords),
      users: await useDrizzle().select().from(tables.users),
      siteUsers: await useDrizzle().select().from(tables.siteUsers),
      userRoles: await useDrizzle().select().from(tables.userRoles),
      userSessions: await useDrizzle().select().from(tables.userSessions),
    };

    writeFileSync(dataLocation, JSON.stringify(data, null, 2));

    return {
      result: "success",
      message: "Database backup successful",
      output: dataLocation,
    };
  },
});
