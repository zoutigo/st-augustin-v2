import { NavRoute } from './types/nav-routes';

/** An array of routes that are accesible to the public
 * These routes does not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/', '/auth/new-verification'];

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

export const NavRoutes: NavRoute[] = [
  {
    name: "L'ecole",
    slug: 'ecole',
    path: '/ecole',
    subroutes: [
      {
        name: 'Equipe',
        slug: 'ecole-equipe',
        path: '/ecole/equipe',
      },
      {
        name: 'Histoire',
        slug: 'ecole-histoire',
        path: '/ecole/histoire',
      },
      {
        name: 'Projets',
        slug: 'ecole-projets',
        path: '/ecole/projets',
      },
      {
        name: 'Infrastructures',
        slug: 'ecole-infrastructures',
        path: '/ecole/infrastructures',
      },
    ],
  },
  {
    name: 'Vie Scolaire',
    slug: 'vie-scolaire',
    path: '/vie-scolaire',
    subroutes: [
      {
        name: 'Cantine',
        slug: 'vie-scolaire-cantine',
        path: '/vie-scolaire/cantine',
      },
      {
        name: 'Garderie',
        slug: 'vie-scolaire-garderie',
        path: '/vie-scolaire/garderie',
      },
      {
        name: 'Pastorale',
        slug: 'vie-scolaire-pastorale',
        path: '/vie-scolaire/pastorale',
      },
    ],
  },
  {
    name: 'Les Classes',
    slug: 'classes',
    path: '/classes',
    subroutes: [
      {
        name: 'Petite Section',
        slug: 'classes-petite-section',
        path: '/classes/petite-section',
      },
      {
        name: 'Moyenne Section',
        slug: 'classes-moyenne-section',
        path: '/classes/moyenne-section',
      },
      {
        name: 'Grande Section',
        slug: 'classes-grande-section',
        path: '/classes/grande-section',
      },
      {
        name: 'CP',
        slug: 'classes-cp',
        path: '/classes/cp',
      },
      {
        name: 'CE1',
        slug: 'classes-ce1',
        path: '/classes/ce1',
      },
      {
        name: 'CE2',
        slug: 'classes-ce2',
        path: '/classes/ce2',
      },
      {
        name: 'CM1',
        slug: 'classes-cm1',
        path: '/classes/cm1',
      },
      {
        name: 'CM2',
        slug: 'classes-cm2',
        path: '/classes/cm2',
      },
    ],
  },
  {
    name: 'Informations',
    slug: 'informations',
    path: '/informations',
    subroutes: [
      {
        name: 'Inscriptions',
        slug: 'informations-incriptions',
        path: '/informations/inscriptions',
      },
      {
        name: 'Fournitures',
        slug: 'informations-fournitures',
        path: '/informations/fournitures',
      },
      {
        name: 'Nous Contacter',
        slug: 'informations-contact',
        path: '/informations/contact',
      },
      {
        name: 'Actualités',
        slug: 'informations-actualites',
        path: '/informations/actualites',
      },
    ],
  },
  {
    name: 'APEL-OGEC',
    slug: 'apel-ogec',
    path: '/apel-ogec',
    subroutes: [
      {
        name: 'APEL',
        slug: 'apel-ogec-apel',
        path: '/apel-ogec/apel',
        finalroutes: [
          {
            name: 'Articles',
            slug: 'apel-ogec-apel-articles',
            path: '/apel-ogec/apel-articles',
          },
          {
            name: 'Albums',
            slug: 'apel-ogec-apel-albums',
            path: '/apel-ogec/apel-albums',
          },
        ],
      },
      {
        name: 'OGEC',
        slug: 'apel-ogec-ogec',
        path: '/apel-ogec/ogec',
        finalroutes: [
          {
            name: 'Articles',
            slug: 'apel-ogec-ogec-articles',
            path: '/apel-ogec/ogec-articles',
          },
          {
            name: 'Albums',
            slug: 'apel-ogec-ogec-albums',
            path: '/apel-ogec/ogec-albums',
          },
        ],
      },
    ],
  },
  {
    name: 'Espace privé',
    slug: 'espace-prive',
    path: '/espace-prive',
    subroutes: [
      {
        name: 'Login',
        slug: 'login',
        path: '/login',
      },
      {
        name: 'Mon Compte',
        slug: 'account',
        path: '/espace-prive/account',
      },
      {
        name: 'Dashboard',
        slug: 'dashboard',
        path: '/espace-prive/dashboard',
        finalroutes: [
          {
            name: 'Utilisateurs',
            slug: 'dashboard-users',
            path: '/espace-prive/dashboard/users',
          },
          {
            name: 'Pages',
            slug: 'dashboard-pages',
            path: '/espace-prive/dashboard/pages',
          },
          {
            name: 'Activités',
            slug: 'dashboard-activites',
            path: '/espace-prive/dashboard/activites',
          },
          {
            name: 'Albums',
            slug: 'dashboard-albums',
            path: '/espace-prive/dashboard/albums',
          },
        ],
      },
    ],
  },
];
