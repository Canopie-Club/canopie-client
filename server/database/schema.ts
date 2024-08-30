import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

// Enums
export const Role = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER',
} as const;

// Tables
export const users = sqliteTable('users', {
  id: text('id').primaryKey().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name'),
  role: text('role').notNull().default(Role.MEMBER),
}, (table) => ({
  emailIdx: uniqueIndex('email_idx').on(table.email),
}));

export const userRoles = sqliteTable('user_roles', {
  roleName: text('role_name').primaryKey(),
  value: integer('value').notNull(),
});

export const userSessions = sqliteTable('user_sessions', {
  id: text('id').primaryKey().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  userId: text('user_id').notNull().references(() => users.id),
});

export const sites = sqliteTable('sites', {
  id: text('id').primaryKey().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  template: text('template').notNull(),
  name: text('name'),
  active: integer('active').notNull().default(1),
});

export const siteUsers = sqliteTable('site_users', {
  id: text('id').primaryKey().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  userId: text('user_id').notNull().references(() => users.id),
  siteId: text('site_id').notNull().references(() => sites.id),
}, (table) => ({
  userSiteIdx: uniqueIndex('user_site_idx').on(table.userId, table.siteId),
}));

export const pages = sqliteTable('pages', {
  id: text('id').primaryKey().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  title: text('title').notNull(),
  path: text('path').notNull(),
  content: text('content').notNull(),
  siteId: text('site_id').notNull().references(() => sites.id),
});

export const routeRecords = sqliteTable('route_records', {
  id: text('id').primaryKey().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  domain: text('domain').notNull(),
  subdomain: text('subdomain'),
  siteId: text('site_id').notNull().references(() => sites.id),
}, (table) => ({
  domainSubdomainIdx: uniqueIndex('domain_subdomain_idx').on(table.domain, table.subdomain),
}));

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  sites: many(siteUsers),
  sessions: many(userSessions),
  role: one(userRoles, {
    fields: [users.role],
    references: [userRoles.roleName],
  }),
}));

export const sitesRelations = relations(sites, ({ many }) => ({
  users: many(siteUsers),
  pages: many(pages),
  routes: many(routeRecords),
}));

export const siteUsersRelations = relations(siteUsers, ({ one }) => ({
  site: one(sites, {
    fields: [siteUsers.siteId],
    references: [sites.id],
  }),
  user: one(users, {
    fields: [siteUsers.userId],
    references: [users.id],
  }),
}));

export const pagesRelations = relations(pages, ({ one }) => ({
  site: one(sites, {
    fields: [pages.siteId],
    references: [sites.id],
  }),
}));

export const routeRecordsRelations = relations(routeRecords, ({ one }) => ({
  site: one(sites, {
    fields: [routeRecords.siteId],
    references: [sites.id],
  }),
}));