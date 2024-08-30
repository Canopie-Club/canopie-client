// TypeScript interfaces for data structures

export interface Site {
  id: string;
  name: string;
  template: string;
}

export interface Page {
  id: string;
  title: string;
  path: string;
  content: string;
  siteId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface SiteUser {
  id: string;
  userId: string;
  siteId: string;
}

export interface RouteRecord {
  id: string;
  domain: string;
  subdomain: string;
  siteId: string;
}

export interface UserRole {
  roleName: string;
  value: number;
}

export interface UserSession {
  id: string;
  userId: string;
  expiresAt: Date | string;
}

export interface Data {
  sites: Site[];
  pages: Page[];
  users: User[];
  siteUsers: SiteUser[];
  routeRecords: RouteRecord[];
  userRoles: UserRole[];
  userSessions: UserSession[];
}

// You can now use these interfaces to type your data structures
