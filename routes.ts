import { NavRoute } from './types/nav-routes';

/** An array of routes that are accesible to the public
 * These routes does not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/', '/auth/new-verification', '/api/files'];

/** An array of routes that are used for authentication
 * These routes will redirect logged users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
];

/** The prefix for api authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/** The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
